export default async function fetchSignin(apiUrl, credentials) {
  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const resObj = await res.json()

    return resObj
  } catch (error) {
    console.log(error)
    return null
  }
}
