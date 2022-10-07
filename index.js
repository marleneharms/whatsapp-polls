const express = require('express');
const app = express();
const mongoose = require('mongoose');

const auth = require('./middlewares/auth.js');
const errors = require('./middlewares/errors.js');
const unless = require('express-unless');

const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
        () => {
          console.log('Database connected');
        },
        (error) => {
          console.log('Database can\'t be connected: ' + error);
        },
    );

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
      path: [
        {url: '/users/login', methods: ['POST']},
        {url: '/users/register', methods: ['POST']},
      ],
    }),
);

app.use(express.json());

app.use('/users', require('./routes/users.routes'));

app.use(errors.errorHandler);

app.listen(PORT, function() {
  console.log('Ready to Go!');
});
