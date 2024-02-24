import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import UserList from "./UserList";

const RoomPage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // on new user connected
    socket.on("users", (data) => {
      console.log(data);
    });

    socket.on("chat", (data) => {
      console.log(data);
      console.log("chat");
    });
  }, []);

  return (
    <div>
      <h1>Room</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("chat", message);
          setMessage("");
        }}
      >
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">Envoyer</button>
      </form>
      <UserList />
    </div>
  );
};

export default RoomPage;
