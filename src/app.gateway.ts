import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
   } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
   
   @WebSocketGateway({
      cors: {
        origin: '*',
      },
   })
   export class AppGateway implements OnGatewayInit {
      @WebSocketServer() server: Server;
      private logger: Logger = new Logger('AppGateway');
    
      @SubscribeMessage('status-change')
      handleMessage(client: Socket): void {
        this.server.emit('status-change', true);
      }
    
      afterInit(server: Server) {
        this.logger.log('Init');
      }

   }