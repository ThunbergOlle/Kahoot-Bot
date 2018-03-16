const Kahoot = require('./export.js');
const listen = require('socket.io').listen(8000).sockets;
var client = new Kahoot;

console.log('Kahoot-Bot is now running.');

    listen.on('connection', function(socket){
        socket.on('submit', function(data){
            var num = data.number;
            var name = data.name;
            var nameArray = [];

                joinGame(name, num);
                
        });
    });
var joinGameIndex = 0;
function joinGame (name, num){
 client.join(num, name+joinGameIndex);        
    client.on("joined", () => {
        console.log('Joined with the username: ' + name+joinGameIndex);
    joinGameIndex++;
    client.join(num, name+joinGameIndex);
    client.on("joined", () => {
    console.log('Joined with the username: ' + name+joinGameIndex);
     });

     
});
} 
