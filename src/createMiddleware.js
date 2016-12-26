// @flow

import onAnonDefault from './onAnonDefault';
import onAuthSuccessDefault from './onAuthSuccessDefault';
import onAuthRejectDefault from './onAuthRejectDefault';
import jwtVerify from './jwtVerify';

import type {
  AnonCbType,
  AuthSuccessCbType,
  AuthRejectCbType,
} from './types';
import type { SocketType } from './types/socket';
import type { JwtOptionsType } from './types/jwt';

type MiddlewareType = (
  socket: SocketType,
  next: () => void,
) => Promise<void>;

type SocketjamType = (config: {
  secret: string,
  jwtOptions?: JwtOptionsType,
  onAnon?: AnonCbType,
  onAuthSuccess?: AuthSuccessCbType,
  onAuthReject?: AuthRejectCbType,
}) => MiddlewareType;

const createMiddleware: SocketjamType = ({
  secret,
  jwtOptions = {},
  onAnon = onAnonDefault,
  onAuthSuccess = onAuthSuccessDefault,
  onAuthReject = onAuthRejectDefault,
}) =>
  async (socket, next) => {
    const { request: { _query, query } = {} } = socket;

    const { token } = (_query || query || {});

    if (!token) {
      onAnon(socket);
      next();
      return;
    }

    try {
      const decodedToken = await jwtVerify(token, secret, jwtOptions);
      onAuthSuccess(socket, decodedToken);
    } catch (e) {
      onAuthReject(socket, {
        name: e.name,
        message: e.message,
      });
    }

    next();
  };

export default createMiddleware;
