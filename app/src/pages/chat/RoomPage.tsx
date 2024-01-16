import { useEffect } from "react";
import socket from "../../utils/socket";

const RoomPage = () => {

    useEffect(() => {
        // on new user connected
        socket.on('users', (data) => {
            console.log(data)
        })
        
        socket.on('chat', () => {
            console.log('chat')
        })
    }, [])

    return ( 
        <div>
            Room
        </div>
     );
}
 
export default RoomPage;