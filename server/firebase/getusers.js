import { db } from "./firestore.js";
import { collection, getDocs } from "firebase/firestore"; 

async function getUsers() {
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log(userList);
  }
  
  getUsers();