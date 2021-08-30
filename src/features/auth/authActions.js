export function signInUser(payload) {
    return {
        type: 'SIGN_IN_USER',
        payload
    }
}

export function signOutUser() {
    return {
        type: 'SIGN_OUT_USER'
    }
}