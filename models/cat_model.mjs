import asd from "mongoose";

var catSchema = asd.Schema({
    name: String,
    age: Number,
    type: String
});

export default asd.model('Cat', catSchema);