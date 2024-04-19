import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { app } from "./firebase";

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export function GoogleSignIn () { 
  signInWithPopup(auth, provider)
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