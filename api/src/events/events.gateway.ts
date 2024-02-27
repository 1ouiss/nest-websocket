import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { decode } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private userService: UserService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  private connectedUsers = [];

  private rooms = {
    general: {
      users: [],
      messages: [],
    },
  };

  @SubscribeMessage('chat')
  async handleMessages(client: Socket, data: any) {
    console.log('chat', data);
    this.server.emit('chat', data);
  }

  // @SubscribeMessage('users')
  // async handleUsers(client: Socket, data: any) {
  //   console.log('users', data);
  //   this.server.emit('users', data);
  // }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, room: string) {
    console.log('joinRoom', room);
    if (!this.rooms[room]) {
      this.rooms[room] = {
        users: [
          this.connectedUsers.find(
            (connectedUser) => connectedUser.socketId === client.id,
          ),
        ],
        messages: [],
      };
    }
    if (!this.rooms[room].users.find((user) => user.socketId === client.id)) {
      this.rooms[room].users.push(
        this.connectedUsers.find(
          (connectedUser) => connectedUser.socketId === client.id,
        ),
      );
    }
    console.log(this.rooms);
    client.join(room);
    this.server.to(room).emit('joinRoom', room);
    this.handleRooms(client, null);
  }

  @SubscribeMessage('rooms')
  async handleRooms(client: Socket, data: any) {
    console.log('rooms', data);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(client: Socket, room: string) {
    console.log('leaveRoom', room);
    client.leave(room);
    this.server.to(room).emit('leaveRoom', room);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: any) {
    console.log('message', data);
    const { room, message } = data;
    this.rooms[room].messages.push({
      user: this.connectedUsers.find(
        (connectedUser) => connectedUser.socketId === client.id,
      ),
      message,
    });
    this.handleRooms(client, null);
    this.server.to(room).emit('message', message);
  }

  @SubscribeMessage('startPrivateChat')
  async handleStartPrivateChat(client: Socket, recipientUsername: string) {
    console.log('startPrivateChat', recipientUsername);
    const recipient = this.connectedUsers.find(
      (user) => user.user.username === recipientUsername,
    );
    if (recipient) {
      client.join(recipient.socketId); // Client A rejoint la room du Client B
      this.server
        .to(recipient.socketId)
        .emit('privateChatStarted', recipientUsername); // Informe le Client B de rejoindre la conversation privée
    } else {
      console.log('Recipient not found');
      // Gérer le cas où le destinataire n'est pas connecté ou n'existe pas
    }
  }

  async handleConnection(client: Socket) {
    console.log('Client connected');
    const { token } = client.handshake.headers;
    console.log(token);

    if (!token) {
      return;
    }

    if (typeof token === 'string') {
      const decoded: any = decode(token);
      const { username } = decoded;
      console.log(username);
      const user = await this.userService.findOneByUsername(username);
      console.log(user);
      // await this.connectedUsersService.create({ socketId: client.id, user });
      this.connectedUsers.push({
        user,
        socketId: client.id,
      });
      if (!this.rooms.general.users.find((u) => u.user.username === username)) {
        this.rooms.general.users.push({
          user,
          socketId: client.id,
        });
      }
      console.log(this.connectedUsers);
      this.server.emit('users', this.connectedUsers);
      this.server.emit('rooms', this.rooms);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected');
    const user = this.connectedUsers.find(
      (connectedUser) => connectedUser.socketId === client.id,
    );
    if (user) {
      // await this.connectedUsersService.delete(user.id);
      this.connectedUsers = this.connectedUsers.filter(
        (connectedUser) => connectedUser.socketId !== client.id,
      );
      this.server.emit('users', this.connectedUsers);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Websocket server initialized');
  }
}
