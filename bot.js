const Kahoot = require('./export.js');
var listen = require('socket.io').listen(4000).sockets;
var mongo = require('mongodb').MongoClient;
const random_name = require('node-random-name');

var client = new Kahoot;

console.log('Kahoot-Bot is now running.');
 mongo.connect("mongodb://127.0.0.1/kahoot", function(err, db){
        if (err) throw err;
        console.log('Connected to the database.');
        var database = db.db('kahoot');


    listen.on('connection', function(socket){
        database.collection('feed').find().limit(10000).toArray(function(err, res){
            if (err) throw err;
           socket.emit('feed', res);
           
        });

        socket.on('submit', function(data){
            var num = data.number;
            var name = data.name;
            
            var nameArray = [];
            database.collection('feed').insert({message: num}, function(num){
                console.log('Inserted feed into database!');
            });
            
            socket.emit('feed', {message: num});
            socket.broadcast.emit('feed',{message: num});
            joinGame(name, num);
        });

       });
    }); 
var start = false;
function joinGame (name, num){
    
 client.join(num, random_name());        
    client.on("joined", () => {
        console.log('Joined the game.');

    client.join(num, random_name());
    client.on("joined", () => {
     });  

});
} 
