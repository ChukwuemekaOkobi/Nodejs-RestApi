let users = require("../data"); 
const utils = require('../utils');


function getAll()
{
    return users; 
}

function findUserById(id)
{
   const user = users.find(p => p.id == id); 

   return user;
}

function create(user)
{
   //get last Id 
   let len = users[users.length - 1].id; 
 
   const newUser  = {id: (len+1), ...user };

   users.push(newUser);

   utils.writeDataToFile('./data.json',users); 

   return newUser; 
}

function update(id, user)
{
    const index = users.findIndex(u => u.id == id); 

    users[index] = {id, ...user}

    utils.writeDataToFile('./data.json', users); 

    return users[index];
}


function remove(id)
{
   users  = users.filter(p => p.id !== id); 

   utils.writeDataToFile('./data.json', users); 
   
}


module.exports = {getAll, findUserById,create, update, remove}