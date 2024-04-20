const { Server } = require("socket.io");
const http = require("http");
//const { createServer } = require("http");

let chatgroups = [];

const ServerIo = () => {
    try {
        const server = http.createServer();
        //const httpServer = createServer();
        const io = new Server(server);

        io.on('connection', (socket) => {
            console.log(`${socket.id} user is connected`);

            socket.on('getAllgroups', () => {
                socket.emit('groupList', chatgroups);
            });

            socket.on('createNewGroup', (currentGroupName) => {
                console.log('Name:', currentGroupName);
                chatgroups.unshift({ id: chatgroups.length + 1, currentGroupName, messages: [] });
                io.emit('groupList', chatgroups); // Broadcast updated group list to all clients
            });

            socket.on('disconnect', () => {
                console.log('Socket Client disconnected');
            });
        });

        server.listen(3000,() => {
            console.log('server is running')
        })
    } catch (error) {
        console.error(error);
    }
}

ServerIo();
