// @flow

import type { SocketType } from './types/socket';

type AnonCbType = (socket: SocketType) => void;

const onAnonDefault: AnonCbType = (socket) => { socket.emit('hello') };

export default onAnonDefault;
