// @flow

import type { ErrorType } from './types';
import type { SocketType } from './types/socket';

type AuthRejectCbType = (socket: SocketType, error: void | ErrorType) => void;

const onAuthRejectDefault: AuthRejectCbType = (socket, { name, message } = {}) => {
  socket.emit('auth/reject', name ? { name, message } : undefined);
};

export default onAuthRejectDefault;
