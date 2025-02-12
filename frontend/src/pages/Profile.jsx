import React from "react";
import { useNavigate } from "react-router";
function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <div>Profile</div>
      <button
        onClick={() => {
          navigate("/signin");
        }}
        className="mt-4 bg-red-200 px-4 py-1 rounded-md hover:bg-red-300 transition-all"
      >
        Logout
      </button>
    </>
  );
}

export default Profile;
