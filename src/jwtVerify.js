// @flow

import jwt from 'jsonwebtoken';

import type { PlainType } from './types';
import type { JwtOptionsType } from './types/jwt';

type JwtVerifyType = (
  token: string,
  secret: string,
  options?: JwtOptionsType,
) => Promise<PlainType>;

const jwtVerify: JwtVerifyType = (token, secret, options = {}) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

export default jwtVerify;
