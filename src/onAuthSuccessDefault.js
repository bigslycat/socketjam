// @flow

import socketOnDecorate from './socketOnDecorate';

import type { AuthSuccessCbType } from './types';

const onAuthSuccessDefault: AuthSuccessCbType = (
  socket,
  decodedToken,
) => {
  // eslint-disable-next-line no-param-reassign
  socket.on = socketOnDecorate(socket.on.bind(socket), decodedToken);
  socket.emit('auth/success');
};

export default onAuthSuccessDefault;
