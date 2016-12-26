// @flow

import onAnonDefault from '../src/onAnonDefault';
import onAuthSuccessDefault from '../src/onAuthSuccessDefault';
import onAuthRejectDefault from '../src/onAuthRejectDefault';
import socketOnDecorate from '../src/socketOnDecorate';

jest.mock('../src/socketOnDecorate');

describe('Callbacks of authentication state', () => {
  describe('onAnonDefault( socket )', () => {
    it('Default callback (anonymous user). Emits "hello" event to socket', () => {
      const emitMock = jest.fn();

      onAnonDefault(({
        emit: eventName => emitMock(eventName),
      }: any));

      expect(emitMock).toHaveBeenCalledTimes(1);
      expect(emitMock).toHaveBeenCalledWith('hello');
    });
  });

  describe('onAuthSuccessDefault( socket )', () => {
    it('Successful authentication callback. Emits "auth/success" event to socket', () => {
      socketOnDecorate.mockImplementation(
        (on, decodedToken) => ({ on, decodedToken }),
      );

      const emitMock = jest.fn();
      const bindMock = jest.fn();

      bindMock.mockReturnValue('onDecorated');

      const on = { bind: bindMock };
      const TOKEN = 'token';

      onAuthSuccessDefault(({ emit: emitMock, on }: any), TOKEN);

      expect(socketOnDecorate).toHaveBeenCalledTimes(1);
      expect(socketOnDecorate).toHaveBeenCalledWith('onDecorated', TOKEN);

      expect(emitMock).toHaveBeenCalledTimes(1);
      expect(emitMock).toHaveBeenCalledWith('auth/success');
    });
  });

  describe('onAuthRejectDefault( socket )', () => {
    it('Authentication failed callback. Emits "auth/reject" event to socket', () => {
      const emitMock = jest.fn();

      onAuthRejectDefault(({
        emit: (eventName, data) => emitMock(eventName, data),
      }: any), {
        name: 'TokenExpiredError',
        message: 'jwt expired',
      });

      expect(emitMock).toHaveBeenCalledTimes(1);
      expect(emitMock).toHaveBeenCalledWith('auth/reject', {
        name: 'TokenExpiredError',
        message: 'jwt expired',
      });
    });
  });
});
