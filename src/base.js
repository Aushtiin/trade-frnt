import firebase from 'firebase';
import 'firebase/storage'

export const app = firebase.initializeApp({
  "projectId": "tradedepotapp",
  "appId": "1:20014299499:web:4ad00d9c730c471fd1742e",
  "storageBucket": "tradedepotapp.appspot.com",
  "locationId": "us-central",
  "apiKey": "AIzaSyAkcF0WfAYvvAFfeoqS4nUnTLUc500s5Jg",
  "authDomain": "tradedepotapp.firebaseapp.com",
  "messagingSenderId": "20014299499"
});