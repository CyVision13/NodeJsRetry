const fs = require('fs');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')


dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD );
const DB = process.env.DATABASE;

mongoose.connect(DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useFindAndModify:false,

  useUnifiedTopology: true
}).then(()=> console.log('DB connection succesfull'));
//read json file
const tours =JSON.parse( fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'))

//import data into db
const importData = async()=>{
    try{
        await Tour.create(tours)
        console.log('Data successfully loaded!');
        process.exit();
    }catch (err){
        console.log(err);
    }
}


// Delete all data from DB
const deleteData = async ()=>{
    try{
        await Tour.deleteMany()
        console.log('Data successfully deleted!');
        process.exit()
    }catch (err){
        console.log(err);
    }
}


if(process.argv[2]==='--import'){
    importData()
} else if (process.argv[2]==='--delete'){
    deleteData()
}

// console.log(process.argv);

