import React from "react";
import { Link } from "react-router-dom";

const ToolBar = () => {
  return (
    <div>
      {user?.result? (
        <div>
          <img src={user.result.imageUrl} alt={user.result.name} />
          <p>{user.result.name.charAt(0)} {user.result.name}</p>
          <button>Logout</button>
        </div>
      ) : (
        <button>
          <Link to="/auth">Login</Link>
        </button>
      )}
    </div>
  );
};

export default ToolBar;
