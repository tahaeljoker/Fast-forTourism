const { createServer } = require('http');
const next = require('next');
const path = require('path');

// The Next.js app is in the 'app' subdirectory
const appDir = path.join(__dirname, 'app');
const dev = process.env.NODE_ENV !== 'production';

// Pass the app directory to the next() constructor
const app = next({ dev, dir: appDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // process.env.PORT is provided by Phusion Passenger, which is common in cPanel
  createServer(handle).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${process.env.PORT}`);
  });
});