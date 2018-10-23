var width = window.innerWidth;
var height = window.innerHeight;
var segmentWidth = window.innerWidth / 2;
var segmentHeight = window.innerHeight;

var lifePoints = 100;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height
});

var layer = new Konva.Layer();
var cardLayer = new Konva.Layer();

var lifePoint = new Konva.Text({
	x: 50,
	y: 50,
	id: 'P1',
	text: `Player Lifepoint: ${lifePoints}`,
	fontSize: 30
});

var background = new Konva.Rect({
	x: 0,
	y: 0,
	width: window.innerWidth,
	height: window.innerHeight,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 4
});

// Drop zone for cards
var cardZone1 = new Konva.Rect({
	x: segmentWidth - (3 / 20) * segmentWidth,
	y: 50,
	width: 3 * (segmentWidth / 10),
	height: segmentHeight / 2,
	fill: 'white',
	stroke: 'black',
	strokeWidth: 4,
	draggable: false
});

drawCards();

layer.add(background);
layer.add(lifePoint);
layer.add(cardZone1);

stage.add(layer);
stage.add(cardLayer);

// SocketIO events
socket.on('damage', ({ damage }) => {
	lifePoints = lifePoints - damage;
	if (lifePoints <= 0) {
		lifePoint.text('You Lose');
		layer.draw();
		socket.emit('game_over');
	} else {
		lifePoint.text(`Lifepoint: ${lifePoints}`);
		layer.draw();
	}
});

socket.on('game_over', () => {
	lifePoint.text('You Win');
	layer.draw();
});
