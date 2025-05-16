const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  console.log(`Request for: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/sorted', (req, res) => {
  const filePath = path.join(__dirname, '../public', 'sorted.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving sorted.html: ${err}`);
      res.status(404).send('File not found');
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
