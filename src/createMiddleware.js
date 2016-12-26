// @flow

import socketOnDecorate from './socketOnDecorate';
import onAnonDefault from './onAnonDefault';
import onAuthSuccessDefault from './onAuthSuccessDefault';
import onAuthRejectDefault from './onAuthRejectDefault';
import jwtVerify from './jwtVerify';

import type { CbType } from './types';
import type { SocketType } from './types/socket';
import type { JwtOptionsType } from './types/jwt';

type MiddlewareType = (
  socket: SocketType,
  next: () => void,
) => Promise<void>;

type SocketjamType = (config: {
  secret: string,
  jwtOptions?: JwtOptionsType,
  onAnon?: CbType,
  onAuthSuccess?: CbType,
  onAuthReject?: CbType,
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

      // eslint-disable-next-line no-param-reassign
      socket.on = socketOnDecorate(socket.on.bind(socket), decodedToken);
      onAuthSuccess(socket);
    } catch (e) {
      onAuthReject(socket, {
        name: e.name,
        message: e.message,
      });
    }

    next();
  };

export default createMiddleware;
