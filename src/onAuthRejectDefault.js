// @flow

import type { AuthRejectCbType } from './types';

const onAuthRejectDefault: AuthRejectCbType = (socket, { name, message } = {}) => {
  socket.emit('auth/reject', name ? { name, message } : undefined);
};

export default onAuthRejectDefault;
