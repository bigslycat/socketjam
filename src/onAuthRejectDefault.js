// @flow

import type { CbType } from './types';

const onAuthRejectDefault: CbType = (socket, { name, message } = {}) => {
  socket.emit('auth/reject', name ? { name, message } : undefined);
};

export default onAuthRejectDefault;
