import {loginWithEmailAndPassword, registerWithEmailAndPassword} from "../firebase/authentication.js";
import { updateProfile } from "firebase/auth"; // Import updateProfile

// export const getUser = async (email) => {
//   const response = await fetch(`http://localhost:3001/api/users/${email}`);
//   const data = await response.json();
//   console.log(data);

//   return data;
// };

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await registerWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName }); // Use updateProfile method
    return user;
  } catch (error) {
    console.error("Error registering new user:", error);
    throw error;
  }
};

export const checkLogin = async (email, password) => {
  const user = await loginWithEmailAndPassword(email, password);
  if (user) {
    // const userName = user.displayName; // Assuming displayName is set during registration
    // localStorage.setItem("user", JSON.stringify({ email: user.email}));
    return true;
  } else {
    return false;
  }
};


