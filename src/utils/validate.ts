export function isUrl(s: string) {
  return /^http[s]?:\/\/.*/.test(s)
}