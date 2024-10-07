// Remove all text enclosed within (), [], and **
export const removeBrackets = (text: string): string =>
  text.replace(/[\[\(].*?[\]\)]|\*\*.*?\*\*/g, '')

// Replace special characters with their HTML entities
export const replaceSpecialChars = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

// Remove emotions and expressions
export const removeEmotions = (text: string): string =>
  text
    .replace(/\b(but|and|or)\b/gi, '<break time="200ms"/>$1')
    .replace(/!/g, '<emphasis level="strong">!</emphasis><break time="500ms"/>')
    .replace(/\?/g, '<prosody pitch="high">?</prosody><break time="500ms"/>')
