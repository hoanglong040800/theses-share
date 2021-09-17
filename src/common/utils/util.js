export function objToQueryString(obj) {
  return Object.entries(obj)
    .reduce((str, [p, val]) => {
      return `${str}${p}=${val}&`
    }, '')
    .slice(0, -1) // trim last char &
    .replace('&', '%26') //change special char into unicode
}
