const User = require('../models/user');



 function getUsers()
{
    try {

        const users  = User.getAll(); 

        return { data: JSON.stringify(users),code:200};
        
    } catch (error) {
         console.log(error);
         
        return {data:JSON.stringify({ "message":"Internal Server error"}), code:500};
    }
}

function getUser(id)
{

    try {
        const user  = User.findUserById(id); 

        if(!user)
        {
            return {data:JSON.stringify({ "message":`user with id: ${id} not found`}), code:404};
        }

        return { data: JSON.stringify(user),code:200};
        
    } catch (error) {
         console.log(error);
         
        return {data:JSON.stringify({ "message":"Internal Server error"}), code:500};
    }
}

function createUser(user)
{

    try {
          
        //parse in user 
        const newUser = User.create(user);

       
        return { data: JSON.stringify(newUser),code:201};
        
    } catch (error) {
         console.log(error);
         
        return {data:JSON.stringify({ "message":"Internal Server error"}), code:500};
    }
}

function updateUser(id, userUpdate)
{

    try {
          
        const user  = User.findUserById(id); 

        if(!user)
        {
            return {data:JSON.stringify({ "message":`user with id: ${id} not found`}), code:404};
        }

        const updateUser = {
            name: userUpdate.name || user.name, 
            age: userUpdate.age || user.age, 
            phone: userUpdate.phone || user.phone
        }

        //parse in user 
        const updatedUser = User.update(id, updateUser);

       
        return { data: JSON.stringify(updatedUser),code:200};
        
    } catch (error) {
         console.log(error);
         
        return {data:JSON.stringify({ "message":"Internal Server error"}), code:500};
    }
}


function deleteUser(id)
{
    
    try {
          
        const user  = User.findUserById(id); 

        if(!user)
        {
            return {data:JSON.stringify({ "message":`user with id: ${id} not found`}), code:404};
        }

        User.remove(id);

       
        return { data: JSON.stringify({"message":"user deleted"}),code:200};
        
    } catch (error) {
         console.log(error);
         
        return {data:JSON.stringify({ "message":"Internal Server error"}), code:500};
    }
}


module.exports = { getUsers, getUser, createUser, updateUser, deleteUser}