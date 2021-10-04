export async function fetchAllTags(apiUrl){
  const res = await fetch(`${apiUrl}/tags`)
  const data = await res.json()

  return data
}