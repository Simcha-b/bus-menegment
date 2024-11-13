import React from "react";
import { Outlet } from "react-router-dom";
import { Heder } from "./Heder";
import Heder2 from "./Heder2";
function Layout() {
  return (
    <>
      <Heder2 />
      <Outlet />
    </>
  );
}

export default Layout;
