import jwt from 'jsonwebtoken';

import jwtVerify from '../src/jwtVerify';

describe('jwtVerify()', () => {
  it('Promisify jwt.verify() method', async () => {
    const secret = 'secret';
    const user = 'vasya';
    const token = jwt.sign({ user }, secret);

    const decoded = await jwtVerify(token, secret);

    expect(decoded).toBeDefined();
    expect(decoded.user).toBe(user);
  });
});
