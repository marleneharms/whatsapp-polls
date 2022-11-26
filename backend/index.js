const express = require('express');
const app = express();
const mongoose = require('mongoose');

const auth = require('./middlewares/auth.js');
const errors = require('./middlewares/errors.js');
const unless = require('express-unless');

const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

app.use(cors());

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

// auth.authenticateToken.unless = unless;
// app.use(
//   auth.authenticateToken.unless({
//     path: [
//       { url: '/users/login', methods: ['POST'] },
//       { url: '/users/register', methods: ['POST'] },
//     ],
//   }),
// );

app.use(express.json());

app.use('/users', require('./routes/users.routes'));
app.use('/polls', require('./routes/polls.routes'));
app.use('/people', require('./routes/people.routes'));
app.use('/whatsapp', require('./routes/whatsapp.routes'));

app.use(errors.errorHandler);

//Be ready to heroku deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
