// @flow

import EventEmitter from 'events';
import socketOnDecorate from '../src/socketOnDecorate';

describe('socketOnDecorate()', () => {
  it([
    'Decorates socket.on() method, returning it to a wrapper that binds decoded token to ',
    'each listener. The decoded token should be sent to the listener by the second argument.',
  ].join('\n      '), () => {
    const socket = new EventEmitter();

    const on = socketOnDecorate((socket.on.bind(socket): any), { user: 'vasya' });
    const listenerMock = jest.fn();

    on('event', listenerMock);
    socket.emit('event', 'eventMessage');

    expect(listenerMock).toHaveBeenCalledTimes(1);
    expect(listenerMock).toHaveBeenCalledWith('eventMessage', { user: 'vasya' });
  });
});
