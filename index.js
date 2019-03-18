// implement your API here
//
const express = require('express');

const db= require('./data/db.js')

const server = express();

server.use(express.json()); //add this to make POST and PUT

server.post('/users', (req, res)=> {
    const userInfo=req.body;
    console.log('user information', userInfo)
    db
        .insert(userInfo)
        .then (user => {
            res.status(201).json(user)
        })
        .catch(err=> {
            res.status(500).json( {error: "There was an error while saving the user to the database"})
        })
})

server.get('/users', (req,res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error =>{
        res.status(500).json( {error: "The users information could not be retrieved."})
    })
})

server.get('/users/:id', (req,res) => {
    const id = req.params.id;
    db
    .findById()
    .then(user => {
        // 200-299 success
        // 300-399 redirect
        // 400-499 client error
        // 500-599 server error
        res.status(200).json(user);
    })
    .catch(error =>{
        res.status(500).json( {message: "The user with the specified ID does not exist."})
    })
})



server.delete('/users:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(deleted => {
            res.status(204).end()
        })
        .catch(err=> {
            res.status(404).json({ error: "The user could not be removed"})
        })
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db
    .update(id, changes).then(updated => {
        if (updated){
            res.status(200).json(updated)
        }
        else {
            res.status(404).json( { message: "The user with the specified ID does not exist." }) 
        }
    })
    .catch(err => {

    })
})

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **')
})


