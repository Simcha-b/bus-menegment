import app from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  }
};

export default loginWithEmailAndPassword;
