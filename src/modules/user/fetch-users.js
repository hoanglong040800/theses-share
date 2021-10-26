// ========= GET ===========
export async function getUserByUsername(apiUrl, user_name) {
  try {
    const res = await fetch(`${apiUrl}/users/${user_name}`)
    const resObj = await res.json()

    return resObj.data
  } catch (e) {
    return false
  }
}

// ======== UPDATE =========
