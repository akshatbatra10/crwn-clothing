import ShopActionType from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionType.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionMap => ({
    type: ShopActionType.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionType.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collecions');
        dispatch(fetchCollectionsStart())
        collectionRef.get().then(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
}
