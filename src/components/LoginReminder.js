import React from "react";

export default function LoginReminder(props) {
  return (
    <div
      style={{
        margin: "auto",
        padding: "1rem",
        display: props.userSignedIn ? "none" : "block",
        textAlign: "center",
      }}
    >
      <h4>Log in to save todos!</h4>
    </div>
  );
}
