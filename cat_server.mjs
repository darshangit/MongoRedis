// import http from "http";

// http.createServer( (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('Hello World\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running on http://127.0.0.1:3000/');

import  express  from "express";
import asd from "body-parser";
import mongos from "mongoose";

const app = express();

mongos.connect('mongodb://localhost/cats')
app.use(asd.json());
app.use(asd.urlencoded({
    extended: true
}));

 import cats from './routes/cat_routes.mjs'
 cats(app,[]);
 
const port = 3000
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
