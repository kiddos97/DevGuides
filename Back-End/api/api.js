const express = require('express')
const bcrypt = require('bcrypt')
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const cors = require('cors');
//const http = require('http');
const app = express()
const { Server } = require("socket.io")
const { createServer } = require( "http");
const { time } = require('console');
const port = 5050
const port1 = 3000

const password = `Keeptrilladmin2021`
const uri = `mongodb+srv://EmmanuelAdmin:${password}@atlascluster.amxnyck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`


app.use(express.json()); //middleware
app.use(express.urlencoded({extended: true}))
app.use(cors());

let UserCollection; // global variable
let MessageCollection;



// let chatgroups = [];
//Function to connect to the Database
const DatabaseConnection = async () => { //MongoDD Server
    try{
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db('DevGuides')
        UserCollection = database.collection('User')
        MessageCollection = database.collection('Message')
        console.log('MongoDB Connected!!')
    }catch(error){
        console.error(`Error connecting to MongoDB: ${error}`)
        process.exit(1)
    }
}


const createUniqueID = () => {
    return Math.random().toString(20).substring(2,10)

}
let chatgroups = [];
const SocketMap = {};
const ServerIo = () => { // Serverr\.I
    try{
        
        const httpserver = createServer(app)
        
        const io = new Server(httpserver,{
            cors:{
                origin:'http://localhost:3000'
            }
        });
        io.on('connection', (socket) => {
            console.log(`${socket.id} user is connected`);

            socket.on('getAllgroups', () => {
                socket.emit('groupList',chatgroups)
            })
            // Handle incoming messages
            socket.on('createNewGroup', (currentGroupName) => {
                console.log('Name1:',currentGroupName);
                chatgroups.unshift({id:chatgroups.length + 1,currentGroupName, messages:[]})
                console.log(chatgroups);

                socket.emit('groupList',chatgroups);
            });

            socket.on('findgroup',(id) => {
                const filteredgroup = chatgroups.filter(item => item.id === id)
                socket.emit('foundgroup',filteredgroup[0].messages)
            })
            socket.on('newChatMessage',(data) => {
                const {currentChatMessage, groupId, userName, timeData} = data;
                const filteredgroup = chatgroups.filter(item => item.id === groupId);
                const newMessage = {
                    id: createUniqueID(),
                    text:currentChatMessage,
                    userName,
                    time: `${timeData.hr}: ${timeData.mins}`
                }

                socket.to(filteredgroup[0].currentGroupName).emit('groupMessage',newMessage)
                filteredgroup[0].messages.push(newMessage);
                socket.emit('foundgroup',filteredgroup[0].messages)

            })

            });

        app.get('/api', (req,res) => {
            res.json(chatgroups)
        })
        httpserver.listen(port1,() => {
            console.log(`Server is running: ${port1}`)
        })
    }catch(error){
        console.error(`${error}`)
        //res.status(500).json({error:`Internal Server error: ${error}` })
    }
}
ServerIo();

DatabaseConnection().then(() => {
    // ServerIo();
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
      })
    app.post('/register', async (req, res) => {

        const {name ,username, email, password} = req.body // deconstructing the req.body
        try{
         
            const exisitingUser = await UserCollection.findOne({ username })
            if(exisitingUser){
                return res.status(400).send('User already exists')
            }
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = {
                name,
                username,
                email,
                password: hashPassword
            };
            await UserCollection.insertOne(newUser);
            res.status(201).json({message: 'User registered successfully'})
        }catch(error){
            res.status(500).send(`${error}`)
        }
    })
    
    app.post('/login', async (req, res)  => {
        const {username, password} = req.body
        try{
            const user = await UserCollection.findOne({username})
            if(!user){
                return res.status(401).json({message:'Invalid username'})
            }
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if(!isPasswordValid){
                return res.status(401).json({message: 'Invalid password'})
            }
            const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
            res.json({ token})
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    app.post('/send-message', async (req, res) => {
        const { name, message } = req.body;
        try{
            const newMessage = {
                name, 
                message,
                createdAt: new Date()
            }
            await MessageCollection.insertOne(newMessage)
            res.status(201).json({message:newMessage})
        }catch(error){
            res.status(500).json({error: `Internal server error: ${error}`})
        }
    });
    // app.get('/message-history',(req, res) => {
    //     try{
    //         res.json(chatgroups)
    //     }catch(error){
    //         console.error(`${error}`)
    //         res.status(500).json({error:`Internal Server ${error}`})
    //     }
    // })
  
}).catch((error) => {
    console.error(`Error start server: ${error}`)
    process.exit(1)
})

