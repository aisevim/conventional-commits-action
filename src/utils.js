export function replaceTextByPosition(text, start, end, colorLog) {
  const textArray = Array.from(text)

  for (let i = start; i < end; i++) {
    textArray[i] = colorLog(textArray[i])
  }

  return textArray.join('')
}

export function ignoreByRegex(array, regex) {
  return array.filter(({ text }) => !new RegExp(regex).test(text))
}
