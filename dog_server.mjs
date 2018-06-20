import  express  from "express";
import asd from "body-parser";
import mongos from "mongoose";

const app = express();

mongos.connect('mongodb://localhost/dogs')
app.use(asd.json());
app.use(asd.urlencoded({
    extended: true
}));

 import dogs from './routes/dog_routes.mjs'
 dogs(app,[]);
 
const port = 3001
app.listen(port, () => console.log(`listening on http://localhost:${port}`));