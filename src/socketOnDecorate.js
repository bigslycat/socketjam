// @flow

import type { PlainType } from './types';
import type { SocketType, OnType, OnCbType } from './types/socket';

type DecorateType = (on: OnType, meta: PlainType) =>
  (eventName: string, handler: OnCbType) =>
    SocketType;

const decorate: DecorateType = (on, meta) =>
  (eventName, handler) =>
    on(eventName, (data) => { handler(data, meta) });

export default decorate;
