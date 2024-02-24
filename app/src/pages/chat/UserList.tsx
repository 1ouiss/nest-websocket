import { useEffect, useState } from "react";
import socket from "../../utils/socket";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // on new user connected
    socket.on("users", (data) => {
      console.log(data);
      setUsers(data);
    });
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
