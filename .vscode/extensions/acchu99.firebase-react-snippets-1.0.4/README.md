# VS Code Firebase-React snippets

This extension for Visual Studio Code adds snippets for Firebase for JavaScript and TypeScript.

![demo](https://raw.githubusercontent.com/Ashwin1999/firebase-react-snippets/main/images/demo.gif)

## Features

This extension provides a collection of easy-to-use firebase snippets for react js and frameworks that uses react and helps developer keep their sanity.

### JavaScript/TypeScript Firebase Snippets

#### Firebase Import Snippets

| Snippet                              | Purpose                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| `fbi-app`                            | general purpose firebase app import                              |
| `fbi-auth`                           | general purpose firebase auth import                             |
| `fbi-firestore`                      | general purpose firebase firestore import                        |
| `fbi-storage`                        | general purpose firebase storage import                          |
| `fbi-initApp`                        | imports initializeApp module from firebase/app                   |
| `fbi-getApp(s)`                      | imports getApp and getApps modules from firebase/app             |
| `fbi-delApp`                         | imports deleteApp module from firebase/app                       |
| `fbi-googleProvider`                 | imports googleAuthProvider from firebase/auth                    |
| `fbi-facebookProvider`               | imports facebookAuthProvider from firebase/auth                  |
| `fbi-twitterProvider`                | imports twitterAuthProvider from firebase/auth                   |
| `fbi-githubProvider`                 | imports githubAuthProvider from firebase/auth                    |
| `fbi-phoneProvider`                  | imports phoneAuthProvider from firebase/auth                     |
| `fbi-createUserWithEmailAndPassword` | imports createUserWithEmailAndPassword module from firebase/auth |
| `fbi-signInWithEmailAndPassword`     | imports signInWithEmailAndPassword module from firebase/auth     |
| `fbi-signInWithPopup`                | imports signInWithPopup module from firebase/auth                |
| `fbi-signOut`                        | imports signOut module from firebase/auth                        |
| `fbi-onAuthStateChanged`             | imports onAuthStateChanged module from firebase/auth             |
| `fbi-getDocs`                        | imports getDocs module from firebase/firestore                   |
| `fbi-collection`                     | imports collection module from firebase/firestore                |
| `fbi-doc`                            | imports doc module from firebase/firestore                       |
| `fbi-getDoc`                         | imports doc and getDoc modules from firebase/firestore           |
| `fbi-setDoc`                         | imports setDoc module from firebase/firestore                    |
| `fbi-addDoc`                         | imports addDoc module from firebase/firestore                    |
| `fbi-queryWhere`                     | imports query and where modules from firebase/firestore          |
| `fbi-updateDoc`                      | imports updateDoc module from firebase/firestore                 |
| `fbi-deleteDoc`                      | imports deleteDoc module from firebase/firestore                 |
| `fbi-onSnapshot`                     | imports onSnapshot module from firebase/firestore                |

#### Firebase Create Snippets

| Snippet                   | Purpose                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `fbc-initApp`             | provides a boilerplate code to initialize firebase app for your project                                               |
| `fbc-regUserEP`           | provides a function to register users using email and password                                                        |
| `fbc-emailPasswordLogin`  | provides a function to login users using email and password                                                           |
| `fbc-googleLogin`         | provides a function to sign in users using google                                                                     |
| `fbc-onAuthStateChanged`  | provides a hook to monitor if the user is logged in or not                                                            |
| `fbc-logoutUser`          | provides a function to logout signed in user                                                                          |
| `fbc-collectionRef`       | creates a reference to a firestore collection                                                                         |
| `fbc-getCollectionData`   | provides an async function to get all the data stored in your collection. (best to use this inside an useEffect hook) |
| `fbc-docRef`              | get document reference                                                                                                |
| `fbc-getDoc`              | get a specific document from collection                                                                               |
| `fbc-setDoc`              | add a document to collection using setDoc                                                                             |
| `fbc-updateSetDoc`        | update a document using setDoc                                                                                        |
| `fbc-queryCollectionData` | query a collection using query and where                                                                              |
| `fbc-addDoc`              | add a document to collection using addDoc                                                                             |
| `fbc-updateDoc`           | update a document to collection using updateDoc                                                                       |
| `fbc-deleteDoc`           | delete a document using deleteDoc                                                                                     |
| `fbc-onSnapshot`          | listen to real-time document update                                                                                   |

## Versions

### 1.0.0

Initial release of Firebase-React Snippets. Not all features from firebase are provided as snippets yet. Only the most common features are implemented for now.

### 1.0.1

Added firestore snippets. Updated fbc-initApp.

### 1.0.2

Added more firestore snippets to perform CRUD operations.

### 1.0.3

Fixed bug in "fbc-docRef" snippet.

### 1.0.4

Added "onSnapshot" snippet and updated import paths.

---
