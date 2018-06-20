import  express  from "express";
import asd from "body-parser";

const app = express();

app.use(asd.json());
app.use(asd.urlencoded({
    extended: true
}));

 import pets from './routes/pet_routes.mjs'
 pets(app);
 
const port = 3002
app.listen(port, () => console.log(`listening on http://localhost:${port}`));