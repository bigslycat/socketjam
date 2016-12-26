# socketjam

The main advantage of this package before
[this package](https://github.com/auth0/node-jsonwebtoken) — this is an opportunity to use a socket
connection without authorization.

## Usage

```javascript
import http from 'http';
import express from 'express';
import socketIo from 'socket.io';
import socketjam from 'socketjam';

const JWT_SECRET = 'secret';

const app = express();
export const server = new http.Server(app);
const io = socketIo.listen(server);

const jwtSocketIoMiddleware = socketjam({
  secret: JWT_SECRET,
  // https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  jwtOptions: { algorithms: ['HS256'] },
  onAnon: socket => socket.emit('hello'),
  onAuthSuccess: socket => socket.emit('auth/success'),
  onAuthReject: (socket, error) => socket.emit('auth/reject', error),
});

io.use(jwtSocketIoMiddleware);

io.sockets.on('connection', (socket) => {
  socket.on('create-post', (postData, decodedToken) => {
    // ...
  });
});

server.listen(PORT);
```
