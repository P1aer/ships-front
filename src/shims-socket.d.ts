import { Socket } from 'socket.io-client';// path to store file

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $socket: Socket;
        sockets: {
            subscribe(eventName: string, handler: socketHandler<Vue>): void,
            unsubscribe(eventName: string): void,
        }
    }
}