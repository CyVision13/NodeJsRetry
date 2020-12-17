const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


process.on('uncaughtException',err => {
  console.log('Unhandled Exception! Shutting down...');
  console.log(err.name,err.message);
  process.exit(1)
})


const app = require('./app');
const mongoose = require('mongoose');

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'natours',
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  
  console.log('Unhandled Rejection! Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});




// console.log(x);