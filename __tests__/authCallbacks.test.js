// @flow

import onAnonDefault from '../src/onAnonDefault';
import onAuthSuccessDefault from '../src/onAuthSuccessDefault';
import onAuthRejectDefault from '../src/onAuthRejectDefault';

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
      const emitMock = jest.fn();

      onAuthSuccessDefault(({
        emit: eventName => emitMock(eventName),
      }: any));

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
