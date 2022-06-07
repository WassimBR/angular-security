
var jwt = require('jsonwebtoken');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE2NTQ1MjcwOTJ9.EixZ7-P9G-nQB7NOD2o3qUDsb2KQRJu26iWwvMUCO_Y';


var secretKey = 'secret-key';



const verify = jwt.verify(existingToken, secretKey);


console.log("Decoded JWT:", verify);





