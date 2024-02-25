import { useNavigate } from "react-router-dom";

const RoomList = ({ rooms }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Rooms</h3>
      <ul>
        {Object.keys(rooms).map((room, index) => (
          <li key={index} onClick={() => navigate(`/rooms/${room}`)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
