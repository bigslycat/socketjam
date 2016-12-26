// @flow

import type { CbType } from './types';

const onAuthSuccessDefault: CbType = (socket) => { socket.emit('auth/success') };

export default onAuthSuccessDefault;
