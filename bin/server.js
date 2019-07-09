
import express from 'express';
import routes from '../controllers';

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
}

app.use(routes);

function listen() {
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    console.log(`Ready! Listening on port ${port}`);
  });
  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0);
    });
  });
  return server;
}

export default () => listen();
