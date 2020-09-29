
var xmpp = require('simple-xmpp');
var argv = process.argv;

xmpp.on('online', function() {
	console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
	xmpp.send(from, 'echo: ' + message);
});

xmpp.on('error', function(err) {
	console.error(err);
});

xmpp.on('buddy', function(jid, state, statusText) {
	console.log("---------------%s is now '%s' (%s)", jid, state, statusText);
});

console.log('argv[0]: ' + argv[0]);
console.log('argv[1]: ' + argv[1]);
console.log('jid: ' + argv[2]);
console.log('password: ' + argv[3]);
console.log('other id: ' + argv[4]);
xmpp.connect({
    jid         : argv[2],
    password    : argv[3],
    host        : 'localhost',
    port        : 5222
});

//function afterwait() {
//}

//console.log('Waiting...');
//setTimeout(afterwait, 5000);
console.log('Sending message...');
xmpp.send(argv[4], 'Mando un mensaje!!!', false);
console.log('Message sent');

