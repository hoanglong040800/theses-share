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

export async function fetchNewestTheses(apiUrl, limit = 10) {
  const res = await fetch(
    `${apiUrl}/theses?_sort=id&_order=desc&_limit=${limit}`
  )
  const data = await res.json()
  return data
}

export async function fetchMostViewsTheses(apiUrl) {
  // fetch du lieu tu json server -> json
  // process.env.API_URL http:localhost:5000
  const res = await fetch(`${apiUrl}/theses?_sort=views&_order=asc`)

  // chuyen json -> object
  const data = await res.json()

  // tra du lieu
  return data
}
