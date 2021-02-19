import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument} from './firebase/firebase.utils'
import HomePage from './pages/homepage/homepage.component';
import {createStructuredSelector} from 'reselect'
import ShopPage from './pages/shops/shop.component';
import Header from './components/header/header.component'
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {connect} from 'react-redux';
import {SetCurrentUser} from './redux/user/user.actions'
import { selectCurrentUser } from './redux/user/user.selector';
import CheckoutPage from './pages/checkout/checkout.component';

class App extends React.Component {

unsubscribeFromAuth = null;

  componentDidMount() {
    const {SetCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          SetCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
      } else {
        SetCurrentUser(userAuth)
      }
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
          exact 
          path='/signin' 
          render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  SetCurrentUser: user => dispatch(SetCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
