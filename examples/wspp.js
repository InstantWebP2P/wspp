var wspp = require('../index.js');

var srv = wspp.createServer({port: 6668}, function(client){
    client.send('Hello, node-androd via wspp', {binary: false, mask: true});
    
    client.on('message', function(message, flags){
        if (flags && flags.binary) 
            console.log('binary message:'+message.toString());
        else 
            console.log('text message:'+message);
            
        client.send(message, flags);
    });
});

var cln = wspp.createConnection('ws://192.188.1.103:6668/wspp', function(){
    console.log('connected done');
    
    cln.on('message', function(message, flags){
        if (flags && flags.binary) 
            console.log('binary message:'+message.toString());
        else 
            console.log('text message:'+message);
    });
    
    cln.send('Hello, Tom');
    
    setInterval(function(){
        cln.send(new Buffer("Hello, node-android@pc"+Date.now()), {binary: true, mask: true});
    }, 2000);
});
 
 var key = 'MTMtVHVlIE9jdCAwNyAxNzoyMjozNiBHTVQrMDg6MDAgMjAxNA==';
 var crypto=require('crypto');
 var shasum = crypto.createHash('sha1');
  shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  var expectedServerKey = shasum.digest('base64');
  
  console.log('key:'+key+',expected:'+expectedServerKey);
  
  