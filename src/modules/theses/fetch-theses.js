// ====== FETCH ======

export async function fetchPaginatedThesesRow(apiUrl, query, page, pageSize) {
  const res = await fetch(
    `${apiUrl}/theses?${query}&_page=${page}&_limit=${pageSize}`
  )
  const data = await res.json()
  return data
}

export async function fetchThesesWithQuery(apiUrl, query) {
  const res = await fetch(`${apiUrl}/theses?${query}`)
  const data = await res.json()
  return data
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

// ===== JSON SERVER ========

export async function fetchNewestThesesJson(apiUrl) {
  try {
    const res = await fetch(`${apiUrl}/theses`)
    const data = await res.json()

    return data
  } catch (error) {
    return false
  }
}

export async function fetchMostViewsTheses(apiUrl, limit = null) {
  // fetch du lieu tu json server -> json
  // process.env.API_URL http://localhost:5000

  const res = limit
    ? await fetch(`${apiUrl}/theses?_sort=views&_order=desc&_limit=${limit}`)
    : await fetch(`${apiUrl}/theses?_sort=views&_order=desc`)

  // chuyen json -> object
  const data = await res.json()

  // tra du lieu
  return data
}

export async function fetchThesisBySlug(apiUrl, slug) {
  const res = await fetch(`${apiUrl}/theses?slug=${slug}&_limit=1`)
  const dataArr = await res.json()

  const data = dataArr[0]

  return data
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
