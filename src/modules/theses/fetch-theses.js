// ====== FETCH ======

export async function fetchPaginatedThesesRow(apiUrl, query, page, pageSize) {
  const res = await fetch(
    `${apiUrl}/theses?${query}&_page=${page}&_limit=${pageSize}`
  )
  const data = await res.json()
  return data
}

export async function fetchThesesWithQuery(apiUrl, query) {
  try {
    const res = await fetch(`${apiUrl}/theses?${query}`)
    const resObj = await res.json()
    const data = await resObj.data

    return data
  } catch (error) {
    return false
  }
}

export async function fetchNewestTheses(apiUrl) {
  try {
    const res = await fetch(`${apiUrl}/theses`)
    const resObj = await res.json()
    const data = resObj.data

    return data
  } catch (error) {
    return false
  }
}

export async function fetchThesisBySlug(apiUrl, slug) {
  try {
    const res = await fetch(`${apiUrl}/theses?slug=${slug}`)
    const resObj = await res.json()
    const data = resObj.data

    return data
  } catch (error) {
    return false
  }
}

// =========  ADD   =========
export async function addThesis(apiUrl, data) {}

export async function addFile(apiUrl, id, file) {
  const data = new FormData()
  data.append('thesis_id', id)
  data.append('file', file)

  try {
    await fetch('api/test/file', {
      method: 'POST',
      headers: {
        'Content-type': 'multipart/form-data',
      },
      body: data,
    })
  } catch (e) {
    console.log(e)
  }
}

// ========= UPDATE =========

// ========= DELETE =========
