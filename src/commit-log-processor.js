import { Chalk } from 'chalk'

import { rulesConfig } from './rules-configs.js'
import { replaceTextByPosition } from './utils.js'

function createMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ' '))
}

function applyRuleToMatrix(_matrix, position, errorMessage, colorLog) {
  const matrix = structuredClone(_matrix)

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i]
    const middlePosition = position[0] + Math.floor((position[1] - position[0]) / 2)

    if (i === 0) {
      line[middlePosition] = colorLog('↑')
    } else {
      line[middlePosition] = colorLog(i + 1 === matrix.length ? '╵' : '┆')
    }

    if (i === matrix.length - 1) {
      line[middlePosition + 1] = colorLog('-')
      line[middlePosition + 2] = colorLog('-')
      line[middlePosition + 3] = colorLog('-')
      line[middlePosition + 5] = colorLog(errorMessage)
    }
  }

  return matrix
}

function formatLog(matrix) {
  return matrix.map(row => row.join('').replace(/\s+$/g, '')).join('\n')
}

function hasError(matrix) {
  return Boolean(matrix.flat(2).join('')
    .replace(/\s+$/g, ''))
}

export function processCommitMessage(message, enableColor = true) {
  const customChalk = new Chalk({ level: enableColor ? 3 : 0 })
  const postion = []
  const commitHeadline = message.split('\n')?.[0]
  let msg = commitHeadline || message
  const maxLength = msg.length + 10
  let matrix = createMatrix(3, maxLength)

  for (const rule of rulesConfig) {
    const match = msg.match(rule.regex)
    const position = match?.indices?.groups?.position
    const ruleNotMatch = position

    if (ruleNotMatch) {
      matrix = applyRuleToMatrix(matrix, position, rule.errorMessage, customChalk[rule.color])
      matrix.push(...createMatrix(2, maxLength))
      postion.push({ color: rule.color, position })
    }
  }

  for (const { color, position } of postion) {
    const underlineStyle = customChalk.dim.italic.underline[color]
    msg = replaceTextByPosition(msg, position[0], position[1], underlineStyle)
  }

  return [hasError(matrix), `\n${ msg }\n${ formatLog(matrix) }`]
}
