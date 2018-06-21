import asd from 'request';
import async from 'async';
import redis from "redis";

asd.defaults({
  json: true
});

let client = redis.createClient(6379,'127.0.0.1');

export default function(app) {
  app.get('/pets', function(req, res) {
    async.parallel(
      {
        cat: function(callback) {
          asd(
            {
              uri: 'http://localhost:3000/cat'
            },
            function(error, response, body) {
              if (error) {
                callback({ service: 'cat', error: error });
                return;
              }
              if (!error && response.statusCode === 200) {
                callback(null, body);
              } else {
                callback(response.statusCode);
              }
            }
          );
        },
        dog: function(callback) {
          client.get('http://localhost:3001/dog', function(error, dog) {
            if(error) {throw error;};
            if(dog) {
              callback(null, JSON.parse(dog));
            }else{
              asd({
                  uri: 'http://localhost:3001/dog'
                },
                function(error, response, body) {
                  if (error) {
                    callback({ service: 'dog', error: error });
                    return;
                  }
                  if (!error && response.statusCode === 200) {
                    callback(null, body.data);
                    client.set('http://localhost:3001/dog', JSON.stringify(body.data), function(error) {
                      if(error) { throw error;};
                    });
                  } else {
                    callback(response.statusCode);
                  }
                }
              );
            }
          })
        }
      },
      function(error, results) {
          var y = 0;
          for(var x=0;x<10000000000000;x++){
                y = y + x;
          }
          console.log(y)
        res.json({
          error: error,
          results: results
        });
      }
    );
  });

  app.get('/ping', function(req, res) {
      res.json({pong: Date.now()});
  });
}
