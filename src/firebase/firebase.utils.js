import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
const config = {
    apiKey: "AIzaSyCXthjv7NDkr223twQ7Ta2yAe2ZKpOM0GA",
    authDomain: "crwn-project-5eb3a.firebaseapp.com",
    projectId: "crwn-project-5eb3a",
    storageBucket: "crwn-project-5eb3a.appspot.com",
    messagingSenderId: "882423868293",
    appId: "1:882423868293:web:d72a2dee26852461fa32ec",
    measurementId: "G-R7BQWCS4WM"
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, ...additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch(err){
            console.log('error', err.message)
        }
    }
    return userRef;
} 

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;