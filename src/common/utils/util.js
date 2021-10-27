export function getNameFromEmail(email) {
  return email.substring(0, email.lastIndexOf('@'))
}

export function getIdFromArrObj(arrObj) {
  return arrObj.map(item => {
    return { id: item.id }
  })
}

export function getIdByValueInArrObj(arrObj, key, value) {
  const result = arrObj.find(el => el[key] === value)

  if (result) return result.id
  else return ''
}
