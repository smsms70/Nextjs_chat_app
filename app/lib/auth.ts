import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, GithubAuthProvider } from "firebase/auth";
import { app } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const auth = getAuth(app);

export function GoogleSignIn () { 
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:")
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export function GitHubSignIn () {
  signInWithPopup(auth, githubProvider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:")
    console.log(errorCode);
    console.log(errorMessage);
  });
}

export function LogOut (){
  signOut(auth).then(() => {
  }).catch((error) => {
    console.log(error)
  });
}