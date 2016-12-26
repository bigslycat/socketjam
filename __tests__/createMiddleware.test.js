// @flow

import jwt from 'jsonwebtoken';

import createMiddleware from '../src/createMiddleware';
import jwtVerify from '../src/jwtVerify';
import socketOnDecorate from '../src/socketOnDecorate';

jest.mock('../src/jwtVerify');
jest.mock('../src/socketOnDecorate');

const secret = 'secret';

const createMocks = () => ({
  onAnonMock: jest.fn(),
  onAuthSuccessMock: jest.fn(),
  onAuthRejectMock: jest.fn(),
  nextMock: jest.fn(),
  onMock: jest.fn(),
});

describe('createMiddleware()', () => {
  it('Should call the onAnon(), if the token is not passed.', async () => {
    const { onAnonMock, onAuthSuccessMock, onAuthRejectMock, nextMock } = createMocks();

    const middleware = createMiddleware({
      secret,
      onAnon: onAnonMock,
      onAuthSuccess: onAuthSuccessMock,
      onAuthReject: onAuthRejectMock,
    });

    await middleware(({ request: {} }: any), nextMock);

    expect(onAnonMock).toHaveBeenCalledTimes(1);
    expect(onAnonMock).toHaveBeenCalledWith({ request: {} });
    expect(onAuthSuccessMock).toHaveBeenCalledTimes(0);
    expect(onAuthRejectMock).toHaveBeenCalledTimes(0);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });

  it('Should call the onAuthSuccess(), if the token is verified.', async () => {
    jwtVerify.mockImplementation(() => Promise.resolve('onStub'));
    socketOnDecorate.mockImplementation((on, decodedToken) => decodedToken);

    const { onAnonMock, onAuthSuccessMock, onAuthRejectMock, nextMock } = createMocks();

    const token = jwt.sign({ user: 'vasya' }, secret);

    const middleware = createMiddleware({
      secret,
      onAnon: onAnonMock,
      onAuthSuccess: onAuthSuccessMock,
      onAuthReject: onAuthRejectMock,
    });

    const onStub = () => {};

    const socket = {
      request: { _query: { token } },
      on: onStub,
    };

    await middleware((socket: any), nextMock);

    expect(onAnonMock).toHaveBeenCalledTimes(0);
    expect(onAuthSuccessMock).toHaveBeenCalledTimes(1);
    expect(onAuthSuccessMock).toBeCalledWith(socket);
    expect(onAuthRejectMock).toHaveBeenCalledTimes(0);

    expect(socket.on).toBe('onStub');

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toBeCalledWith();
  });

  it('Should call the onAuthReject(), if the token is rejected.', async () => {
    const error = {
      name: 'JsonWebTokenError',
      message: 'jwt malformed',
    };

    jwtVerify.mockImplementation(() => Promise.reject(error));
    const { onAnonMock, onAuthSuccessMock, onAuthRejectMock, nextMock } = createMocks();

    const middleware = createMiddleware({
      secret,
      onAnon: onAnonMock,
      onAuthSuccess: onAuthSuccessMock,
      onAuthReject: onAuthRejectMock,
    });

    const on = () => {};

    const socket = { request: { _query: { token: 'INVALID' } }, on };

    await middleware((socket: any), nextMock);

    expect(onAnonMock).toHaveBeenCalledTimes(0);
    expect(onAuthSuccessMock).toHaveBeenCalledTimes(0);
    expect(onAuthRejectMock).toHaveBeenCalledTimes(1);
    expect(onAuthRejectMock).toHaveBeenCalledWith(socket, error);
    expect(socket.on).toBe(on);

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(nextMock).toHaveBeenCalledWith();
  });
});
