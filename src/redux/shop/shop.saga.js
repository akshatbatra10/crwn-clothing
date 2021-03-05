import { takeLatest, call, put, all } from 'redux-saga/effects'
import ShopActionType from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.action'

export function* fetchCollectionsAsync() {
    try {
        const collectionRef = firestore.collection('collecions');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionType.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionsStart)])
}