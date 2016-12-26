// @flow

import socketOnDecorate from './socketOnDecorate';

import type { PlainType } from './types';
import type { SocketType } from './types/socket';

type AuthSuccessCbType = (socket: SocketType, decodedToken: PlainType) => void;

const onAuthSuccessDefault: AuthSuccessCbType = (
  socket,
  decodedToken,
) => {
  // eslint-disable-next-line no-param-reassign
  socket.on = socketOnDecorate(socket.on.bind(socket), decodedToken);
  socket.emit('auth/success');
};

export default onAuthSuccessDefault;
