const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/game', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/game.html'));
});

app.get('/win', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/win.html'));
});

app.get('/lose', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/lose.html'));
});

http.listen(port, () => {
	console.log(`listening on port ${port}`);
});

io.on('connection', socket => {
	socket.on('damage', data => {
		console.log(data);
		socket.broadcast.emit('damage', data);
	});
	socket.on('game_over', () => {
		socket.broadcast.emit('game_over');
	});
});
