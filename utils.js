const fs = require('fs'); 



function writeDataToFile(filename, content)
{
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err=>{
        if(err)
        {
            console.log(err);
        }
    })

}

function getPostData(request)
{
   return new Promise((resolve, reject)=>{
    try {
        let body = ""; 
        request.on('data', c => {
            body += c.toString(); 
        })
    
        request.on('end', () => {
            resolve(JSON.parse(body)); 
        })
    } catch (error) {
        reject(error);
    }
   
   })
  
}
module.exports = {writeDataToFile, getPostData}