import { useEffect, useState } from "react";
import socket from "../../utils/socket";
import UserList from "./UserList";
import RoomList from "./RoomList";
import { useNavigate, useParams } from "react-router-dom";

const RoomPage = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [newRoom, setNewRoom] = useState("");

  const [rooms, setRooms] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    // on new user connected
    socket.on("users", (data) => {
      console.log(data);
    });

    socket.on("chat", (data) => {
      console.log(data);
      console.log("chat");
    });

    socket.on("rooms", (data) => {
      console.log(data);

      setRooms(data);
    });
  }, []);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      <h1>Room</h1>
      {id &&
        rooms[id] &&
        rooms[id].messages.map((message, index) => (
          <div key={index}>
            {message.message} {message.user.user.username}
          </div>
        ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("message", {
            room: id,
            message,
          });
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("joinRoom", newRoom);
          setNewRoom("");
          navigate(`/rooms/${newRoom}`);
        }}
      >
        <input
          type="text"
          onChange={(e) => {
            setNewRoom(e.target.value);
          }}
          value={newRoom}
        />
        <button type="submit">join room</button>
      </form>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default RoomPage;
