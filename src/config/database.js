import mongoose from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/ynov-api")
    .then(() => console.log('connected !'))
    .catch((e) => console.log('Error : '+e))