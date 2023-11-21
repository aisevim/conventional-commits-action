import { rulesConfig } from './rules.js';

function createMatrix(rows, cols) {
  return Array.from({ length: rows }, () => Array.from({ length: cols }, () => " "));
}

function applyRuleToMatrix(_matrix, position, errorMessage) {
	const matrix = structuredClone(_matrix);

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    const middlePosition = position[0] + Math.floor((position[1] - position[0]) / 2);

    if (i === 0) {
			line[middlePosition] = "↑";
		} else {
			line[middlePosition] = i + 1 === matrix.length ? "╵" : '┆';
		}

    if (i === matrix.length - 1) {
      line[middlePosition + 1] = '-';
      line[middlePosition + 2] = '-';
      line[middlePosition + 3] = '-';
      line[middlePosition + 5] = errorMessage;
    }
  }

  return matrix;
}

function formatLog(matrix) {
  return matrix.map(row => row.join('').replace(/\s+$/g, '')).join('\n');
}

function hasError(matrix) {
	return Boolean(matrix.flat(2).join('').replace(/\s+$/g, ''))
}

export function checkCommitMessages(message) {
  const maxLength = message.length + 10;
  let matrix = createMatrix(3, maxLength);

  for (const rule of rulesConfig) {
    const match = message.match(rule.regex);
    const position = match?.indices?.groups?.position;

    if (!position) {
			continue
		}

		matrix = applyRuleToMatrix(matrix, position, rule.errorMessage);
		matrix.push(...createMatrix(2, maxLength));
  }

  return [hasError(matrix), `\n${message}\n${formatLog(matrix)}`];
}
