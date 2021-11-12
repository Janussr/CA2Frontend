import React from "react";
import { useEffect } from "react";
import facade from "../apiFacade";

function Admin({ userMessage, setUserMessage }) {
  useEffect(() => {
    facade
      .fetchData("admininfo")
      .then((data) => setUserMessage(data.msg))
      .catch((error) => setUserMessage("  "));
  }, [setUserMessage]);

  return (
    <div>
      <h1>User</h1>
      <h2>{userMessage}</h2>
    </div>
  );
}

export default Admin;
