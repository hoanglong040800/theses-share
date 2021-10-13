export async function fetchAllTags(apiUrl) {
  try {
    const res = await fetch(`${apiUrl}/tags`)
    const resObj = await res.json()

    return resObj.data
  } catch (error) {
    return false
  }
}

export async function fetchAllFaculties(apiUrl) {
  try {
    const res = await fetch(`${apiUrl}/faculties`)
    const resObj = await res.json()

    return resObj.data
  } catch (error) {
    return false
  }
}
