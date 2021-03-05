import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { SignInFailure, SignInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';

export function* getSnapshotFromUserAuth(userauth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userauth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(
            SignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch (err) {
        put(SignInFailure(err))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user)
    } catch (err) {
        put(SignInFailure(err))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (err) {
        put(SignInFailure(err))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (err) {
        put(SignInFailure(err))
    }
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ user, additionalData: { displayName } }))
    } catch (err) {
        yield put(signUpFailure(err))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        put(signOutSuccess())
    } catch (err) {
        put(signOutFailure(err))
    }
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSaga() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)])
}