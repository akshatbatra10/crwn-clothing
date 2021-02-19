import { createSelector } from 'reselect';
import memoize from 'lodash.memoize'

const selectShop = state  => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectCollection = memoize((CollectionUrlParam) => (
    createSelector(
        [selectShopCollections],
        collections => collections ? collections[CollectionUrlParam]: null)
    )
)