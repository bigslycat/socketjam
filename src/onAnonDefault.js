// @flow

import type { CbType } from './types';

const onAnonDefault: CbType = (socket) => { socket.emit('hello') };

export default onAnonDefault;
