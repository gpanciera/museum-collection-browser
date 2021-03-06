const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));
app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('CORS-enabled web server listening on port:', server.address().port);
});
