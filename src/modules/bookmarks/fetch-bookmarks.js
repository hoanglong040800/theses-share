// ======= ADD =============
export async function addBookmark(apiUrl, user_name, thesis_id) {
  try {
    const res = await fetch(
      `${apiUrl}/users/${user_name}/bookmarks/${thesis_id}`,
      {
        method: 'POST',
      }
    )

    const resObj = await res.json()

    return resObj.status
  } catch (e) {
    return false
  }
}

// ======== GET =========
export async function getBookmarksByUsername(apiUrl, user_name) {
  try {
    const res = await fetch(`${apiUrl}/users/${user_name}/bookmarks`)
    const resObj = await res.json()

    return resObj.data
  } catch (e) {
    return false
  }
}

// ======== DELETE =========
export async function deleteBookmark(apiUrl, user_name, thesis_id) {
  try {
    const res = await fetch(
      `${apiUrl}/users/${user_name}/bookmarks/${thesis_id}`,
      {
        method: 'DELETE',
      }
    )

    const resObj = await res.json()

    return resObj.status
  } catch (e) {
    return false
  }
}