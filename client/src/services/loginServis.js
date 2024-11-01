import loginWithEmailAndPassword from "../firebase/authentication.js";

export const getUser = async (email) => {
  const response = await fetch(`http://localhost:3001/api/users/${email}`);
  const data = await response.json();
  console.log(data);

  return data;
};

export const checkLogin = async (email, password) => {
  const user = await loginWithEmailAndPassword(email, password);
  if (user) {
    const userName = await getUser(user.email);
    localStorage.setItem("user", JSON.stringify(userName));
    return true;
  } else {
    return false;
  }
};
