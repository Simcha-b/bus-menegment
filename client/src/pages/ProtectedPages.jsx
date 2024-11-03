import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";
function ProtectedPages() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // לנקות את המאזין כאשר הקומפוננטה משתנה
  }, [auth]);

  // return user ? <Outlet /> : <Navigate to="/login" />;
  return true ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedPages;
