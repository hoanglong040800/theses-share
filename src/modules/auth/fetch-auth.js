export default async function fetchSignin(apiUrl, credentials) {
  const res = await fetch(
    `${apiUrl}/users?email=${credentials.email}&password=${credentials.password}&_limit=1`
  )

  const data = await res.json()

  return data[0]
}
