import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAX-Nnd3cXgu14-wJfIRAOrzA4XOMKaaPQ',
	authDomain: 'coffmeet.firebaseapp.com',
	projectId: 'coffmeet',
	storageBucket: 'coffmeet.appspot.com',
	messagingSenderId: '762273766154',
	appId: '1:762273766154:web:8552e5d0aceee930e938f3',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
