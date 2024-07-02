const cors = require('cors');
const sls = require('serverless-http');
const app = require('./config/express');
const userRoute = require('./route/userRoute');
const recipeRoute = require('./route/recipeRoute');
require('dotenv').config();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      return res.status(200).json({});
  }
  next();
});

app.use('/api/user', userRoute);
app.use('/api/recipes', recipeRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// module.exports.server = sls(app);