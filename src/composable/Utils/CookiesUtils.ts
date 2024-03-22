function getCookieFromValue (value: string) {
    let cookie: string | undefined = document.cookie.split('; ').find(row => row.startsWith('token='))
	cookie = cookie?.split('=')[1] ?? undefined

    return cookie
}

export default getCookieFromValue