import asd from "mongoose";

var dogSchema = asd.Schema({
    name: String,
    age: Number,
    type: String
});

export default asd.model('Dog', dogSchema);