const cors = require('cors');
const app = require('./config/express');
const userRoute = require('./route/userRoute');
const recipeRoute = require('./route/recipeRoute');
require('dotenv').config();

app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/recipes', recipeRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});