const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const tourSchema = new mongoose.Schema({
  name:{
    type:String ,
    required: [true,'A tour must have a name'],
    unique: true
  },
  rating : {
    type:Number,
    default: 4.5
  },
  price:{
    type:Number,
    required:[true,'A tour must have a price']
  }
})

const Tour = mongoose.model('Tour',tourSchema)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
