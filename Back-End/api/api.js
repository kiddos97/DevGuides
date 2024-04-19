const express = require('express')
const bcrypt = require('bcrypt')
const { MongoClient } = require("mongodb");
const jwt = require('jsonwebtoken');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express()
const port = 3000

const password = `Keeptrilladmin2021`
const uri = `mongodb+srv://EmmanuelAdmin:${password}@atlascluster.amxnyck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`


app.use(express.json()); //middleware
app.use(cors());

let UserCollection; // global variable
let MessageCollection;
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

const ServerIo = async () => { // Serverr\.I
    try{
        const io =  new Server(app);
        io.on('connection', (socket) => {
            console.log(' Socket server Client connected');
            // Handle incoming messages
            socket.on('message', (message) => {
                console.log('Received message:', message);
                // Broadcast the message to all connected clients
                io.emit('message', message);
            });
            // Handle disconnections
            socket.on('disconnect', () => {
                console.log(' Socket Client disconnected');
            });
            });
    }catch(error){
        console.error(`${error}`)
        //res.status(500).json({error:`Internal Server error: ${error}` })
    }
}


ServerIo();

DatabaseConnection().then(() => {

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
        }finally {
            await client.close();
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
    app.get('/message-history',async (req, res) => {
        try{
            const messages = await MessageCollection.find().sort({createdAt:-1}).limit(20);
            res.status(201).json({messages})
        }catch(error){
            console.error(`${error}`)
            res.status(500).json({error:`Internal Server ${error}`})
        }
    })
  
}).catch((error) => {
    console.error(`Error start server: ${error}`)
    process.exit(1)
})

