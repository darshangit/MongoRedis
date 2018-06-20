import _ from 'lodash';
import Dog from '../models/dog_model.mjs';

export default function(app,_dogs) {
    /* Create */
    app.post('/dog', function (req, res) {
       var newDog = new Dog(req.body);
       newDog.save((err) => {
        if(err){
            res.json({info: 'Error during dog create', error: err});
            }
            res.json({info: 'dog created successfully'})
        });
       })

    /* Read */
    app.get('/dog', function (req, res) {
       Dog.find( (err, dogs) => {
           if(err){
               res.json({info: 'Error during find dogs', error: err});
           }
            res.json({info: 'dogs found successfully', data: dogs});
        })
    });

    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, (err, dog) => {
           if(err){
               res.json({info: 'error during find dog', error: err});
           };
           if(dog){
               res.json({info: 'dog found successfully', data: dog})
           }else {
               res.json({info: 'dog not found'})
           }
       });
    });

    /* Update */
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, (err,dog) => {
            if(err) {
                res.json({info: 'error during find dog', error: err});
            };
            if(dog){
                _.merge(dog, req.body);
                dog.save((err) => {
                    if(err) {
                        res.json({info: 'Error during dog update', error: err})
                    }
                    res.json({info: 'dog updated successfully'});
                });
            } else {
                res.json({info: 'dog not found'});
            }
        })
    });

    /* Delete */
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, (err) => {
            if(err) {
                res.json({info: 'error during remove dog', error: err});
            }
            res.json({info: 'dog removed successfully'});
        })
    });
};