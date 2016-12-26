// @flow

/* eslint no-use-before-define: off */

import type { PlainType } from './';

export type OnCbType = (data: PlainType) => void;

export type OnType = (
  eventName: string,
  callback: OnCbType,
) => SocketType;

export type SocketType = {
  on: OnType,
  emit: (
    eventName: string,
    data: ?PlainType,
  ) => SocketType,
  request: {
    [key: '_query' | 'query']: { token: string },
  },
};
