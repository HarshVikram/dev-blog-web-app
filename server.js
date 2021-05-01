const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const db = config.get('mongoURI');

const app = express();

app.use(express.json({ extended: false }));

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DATABASE Connected'));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));