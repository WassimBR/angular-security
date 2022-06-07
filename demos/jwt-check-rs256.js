
var jwt = require('jsonwebtoken');
var fs = require('fs');


// verify an existing JWT
var existingToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQ1MjgzMjYsImV4cCI6MTY1NDUyODQ0Niwic3ViIjoiMSJ9.XV_-44D8gt2i2Pjjbspa9_2WyvR_zZTKB4Begt7sqwDwT4byELaCO3Mjhpk-o9CplAVyggEK3m5oymVOoD2K1kzkBtqSIK-vSDo3UxtPS0IYahFqaUFV7O3l6XnLwGypWCVR8ujbs03sSYrhtp_TX2q49hmgbt5uuYYD9eqF_F9w7o6X3dLuqJA-KLbWyd8DuFywQrXYz4Gmy89XmVuhSNg1PjFvaFP3nYblcRm_ChEya3TWxeFDTRjbkftfOsVjquk6EfikkQrDXJe7ObRVLc1tptCtjIL84XSpFB3FtlwKRT-vckhGwMsQMyI6P7XIRu0cLno9s4aXvC-stQvOiA';


var publicKey = fs.readFileSync('./demos/public.key');


console.log("verifying");

const verify = jwt.verify(existingToken, publicKey);



console.log("Decoded JWT:", verify);

