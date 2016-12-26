// @flow

import type { AnonCbType } from './types';

const onAnonDefault: AnonCbType = (socket) => { socket.emit('hello') };

export default onAnonDefault;
