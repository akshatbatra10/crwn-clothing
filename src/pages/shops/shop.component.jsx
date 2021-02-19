import React from 'react';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionPage from '../collection/collection.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils'
import { updateCollections } from '../../redux/shop/shop.action';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props
        const collectionRef = firestore.collection('collecions');
        collectionRef.get().then( async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionMap)
            this.setState({ loading: false })
        })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props}/>} />
                <Route path={`${match.path}/:collectionId`} render ={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
        
    }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionMap => dispatch(updateCollections(collectionMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);