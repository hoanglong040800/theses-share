export function getNameFromEmail(email) {
  return email.substring(0, email.lastIndexOf('@'))
}

export function getIdFromArrObj(arrObj) {
  return arrObj.map(item => {
    return { id: item.id }
  })
}
