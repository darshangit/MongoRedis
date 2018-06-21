import asd from 'request';
import async from 'async';
import redis from "redis";

asd.defaults({
  json: true
});

let client = redis.createClient(6379,'127.0.0.1');

export default function(app) {
  /* Read */
  app.get('/pets', function (req, res) {

    async.parallel({
        cat: function(callback){
            asd({uri: 'http://localhost:3000/cat'}, function(error, response, body) {
                if (error) {
                    callback({service: 'cat', error: error});
                    return;
                };
                if (!error && response.statusCode === 200) {
                    callback(null, body.data);
                } else {
                    callback(response.statusCode);
                }
            });
        },
        dog: function(callback){

            client.get('http://localhost:3001/dog', function(error, dog) {
                if (error) {throw error;};
                if (dog) {
                    callback(null, JSON.parse(JSON.stringify(dog)));
                } else {

                    asd({uri: 'http://localhost:3001/dog'}, function(error, response, body) {
                        if (error) {
                            callback({service: 'dog', error: error});
                            return;
                        };
                        if (!error && response.statusCode === 200) {
                            // client.set('http://localhost:3001/dog', JSON.stringify(body.data), function (error) {
                              client.set('http://localhost:3001/dog', JSON.stringify(body.data), function (error) {
                                if (error) {throw error;};
                            });
                            callback(null, body.data);
                        } else {
                            callback(response.statusCode);
                        }
                    });

                }
            });

        }
    },
    function(error, results) {
        res.json({
            error: error,
            results: results
        });
    });

});

app.get('/ping', function (req, res) {
    res.json({pong: Date.now()});
});
}
