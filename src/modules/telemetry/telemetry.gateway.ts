import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; 
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  }, 
})
export class TelemetryGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('TelemetryGateway');

  public sendTelemetryUpdate(vehicleId: string, data: any) {
    this.server.emit(`telemetryUpdate:${vehicleId}`, data);
    this.server.emit('telemetryUpdate', data);
  }

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Inicializado!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('messageFromClient')
  handleMessage(client: Socket, payload: any): void {
    this.logger.log(`Mensagem recebida do cliente ${client.id}: ${payload}`);
    client.emit('messageFromServer', 'Mensagem recebida com sucesso!');
  }
}