import UserActionTypes from './user.types'

export const GoogleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const SignInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const SignInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const EmailSignInStart = (EmailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: EmailAndPassword
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (err) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: err
})

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = (err) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: err
})