const express = require('express')
//const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const { MongoClient } = require("mongodb");
// import mongoose from 'mongoose'
const jwt = require('jsonwebtoken');


const app = express()
const port = 3000

const password = `Keeptrilladmin2021`
const uri = `mongodb+srv://EmmanuelAdmin:${password}@atlascluster.amxnyck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`

//connecting to the MongoDB
const client = new MongoClient(uri)

app.use(express.json()); //middleware

app.post('/register', async (req, res) => {

    const {name ,username, email, password} = req.body // deconstructing the req.body
    try{
        await client.connect()
        const database = client.db('DevGuides')
        const collection = database.collection('User')
        const exisitingUser = await collection.findOne({ username })
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
        await collection.insertOne(newUser);
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
        const user = await collection.findOne({ username })
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
app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })