// import http from "http";

// http.createServer( (req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('Hello World\n');
// }).listen(3000, '127.0.0.1');

// console.log('Server running on http://127.0.0.1:3000/');

import  express  from "express";
const app = express();
const port = 3000
app.get('/', (req, res) => {
    // res.send(`Hello World`);
    res.json({hello: 'hi'});
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
