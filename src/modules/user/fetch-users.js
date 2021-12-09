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

export async function updateUserProfile(apiUrl, user_name, data) {
  try {
    const res = await fetch(`${apiUrl}/users/${user_name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const resObj = await res.json()

    return resObj.status
  } catch (e) {
    return false
  }
}
