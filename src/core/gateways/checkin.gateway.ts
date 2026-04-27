import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket'],
})
export class CheckInGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendCheckInUpdate(bookingId: string, data: any) {
    this.server.to(bookingId).emit('checkInStatus', data);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, bookingId: string) {
    client.join(bookingId);
    console.log(`Client ${client.id} joined room: ${bookingId}`);
  }
}
