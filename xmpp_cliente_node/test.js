var xmpp = require('simple-xmpp');
var argv = process.argv;

xmpp.on('online', function() {
	console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
	//xmpp.send(from, 'echo: ' + message);
	console.log('Received from ' + from);
	console.log(message);
});

xmpp.on('error', function(err) {
	console.error(err);
});

xmpp.on('buddy', function(jid, state, statusText) {
	console.log("---------------%s is now '%s' (%s)", jid, state, statusText);
});

console.log('jid: ' + argv[2]);
console.log('password: ' + argv[3]);
xmpp.connect({
    jid         : argv[2],
    password    : argv[3],
    host        : 'localhost',
    port        : 5222
});
