const http = require('http'); 
const userController = require("./controllers/userController");

const utils = require("./utils");

const PORT = process.env.PORT || 5000; 

const server = http.createServer(async (request, response) =>
{
   let method = request.method; 
   let url = request.url; 
   let statusCode = 200; 
   let responseData = ""; 

   //Checking the routes 
   // api/users/
   if(url.match(/\/api\/users$/) && method === 'GET' ){

        let {data, code }  = userController.getUsers(); 
        responseData = data; 
        statusCode  = code;
   }
    // /api/users/:id 
   else if(url.match(/\/api\/users\/([0-9]+)/) && method === "GET")
   {
       const id = url.split('/')[3];

       let {data, code }  = userController.getUser(id); 
       responseData = data; 
       statusCode  = code;
   }
    // create post /api/users
   else if (url.match(/\/api\/users$/) && method === "POST")
   {      
        
       var user = await utils.getPostData(request);
        
        let {data, code }  = userController.createUser(user); 

        responseData = data; 
        statusCode  = code;
  
   }
   //update put /api/users/:id
   else if (url.match(/\/api\/users\/([0-9]+)/) && method === "PUT")
   {    

        const id = url.split('/')[3];

        var user = await utils.getPostData(request);
        
        let {data, code }  = userController.updateUser(id,user); 

        responseData = data; 
        statusCode  = code;
  
   }
   //delete 
   else if(url.match(/\/api\/users\/([0-9]+)/) && method === "DELETE")
   {
      const id = url.split('/')[3];
      let {data, code }  = userController.deleteUser(id); 

      responseData = data; 
      statusCode  = code;
   }
   else 
   {
       statusCode = 404; 
       responseData = JSON.stringify({'message':'route not found'});
   }


   response.writeHead( statusCode, { 'Content-Type': "application/json"});
   response.end(responseData);
});

server.listen(PORT, () => { 
    console.log("Server listening on PORT: ", PORT); 
});