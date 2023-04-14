import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RutePrivade() {
  let admin = false;

  if (!admin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}