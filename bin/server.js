
import express from 'express';
import routes from '../controllers';
import allowOrigin from '../middleware/allow-origin';
import bodyParser from '../middleware/body-parser';

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  app.use(allowOrigin);
}

app.use(bodyParser);
app.use(routes);

function listen() {
  const port = process.env.PORT || 8080;
  const server = app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Ready! Listening on port ${port}`);
    }
  });
  process.on('SIGINT', () => {
    server.close(() => {
      process.exit(0);
    });
  });
  return server;
}

export default () => listen();
