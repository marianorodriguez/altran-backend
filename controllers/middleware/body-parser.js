import bodyParser from 'body-parser';

export default bodyParser.json({
  verify(_req, res, buf) {
    const req = _req;
    req.rawBody = buf.toString();
  },
  limit: '50mb',
});
