import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import './collection-overview.style.scss';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';
import CollectionPreview from '../collection-preview/collection-preview.component'

const CollectionOverview = ({collections}) => (
    <div className='collections-overview'>
    {
        collections.map(({id, ...otherCollections}) => (
            <CollectionPreview key={id} {...otherCollections}/>
        ))
    }
    </div>
)
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionOverview)