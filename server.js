const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use('/static', express.static(path.resolve(__dirname, 'dist', 'static')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port || 3000, () => console.log(`Server running...`));
