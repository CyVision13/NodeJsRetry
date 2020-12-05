const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
    .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: "natours",
    useUnifiedTopology: true 
  })
  .then(() => console.log('DB connection successful!'));




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
