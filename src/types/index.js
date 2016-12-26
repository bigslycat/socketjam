// @flow

/* eslint no-use-before-define: off */


import type { SocketType } from './socket';

export type PrimType = boolean | string | number;
export type ObjType = { [key: string]: PlainType };
export type ArrType = Array<PlainType>;
export type PlainType = ?(PrimType | ObjType | ArrType);

export type ErrorType = {
  name: 'TokenExpiredError' | 'JsonWebTokenError',
  message: ?string,
  expiredAt?: number,
};

export type CbType = (socket: SocketType, error: void | ErrorType) => void;
