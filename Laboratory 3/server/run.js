var api = require('./api.js').app;
var hamming = require('./hamming.js');

api.put('/message', function(request, response) {
  var bits = request.body.bits;
  bits = distortBit(bits);

  console.log("\n Received sequence: " + bits + "\n");
  var decoded = hamming.decode(bits, request.body.bits.length);
  if(decoded.errorCorrected) {
    if(decoded.errorPosition != -1)
      response.json('One error corrected on position in the encoded message: ' + (decoded.errorPosition + 1));
    else
      response.json('Two errors detected, the message needs to be resented');
  }
});

api.listen(3000, function(){
  console.log('CORS-enabled web server is listening on port 3000...');
});

function distortBit(bits){
  var errors = Math.floor(Math.random() * 3);
  for(let i=0;i<errors;i++) {
    var index = Math.floor(Math.random() * bits.length);
    bits[index] = (bits[index]+1) % 2;
  }
  return bits;
}