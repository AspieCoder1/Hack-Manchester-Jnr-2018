var width = window.innerWidth;
var height = window.innerHeight;
var segmentWidth = window.innerWidth / 2;
var segmentHeight = window.innerHeight;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height
});

var layer = new Konva.Layer();
var layer2 = new Konva.Layer();

var lifePoint = new Konva.Text({
	x: 50,
	y: 50,
	id: 'P1',
	text: 'Player Lifepoint: 100',
	fontSize: 30
});

var segment1 = new Konva.Rect({
	x: 0,
	y: 0,
	width: segmentWidth,
	height: segmentHeight,
	fill: 'blue',
	stroke: 'black',
	strokeWidth: 4
});

var segment2 = new Konva.Rect({
	x: segmentWidth,
	y: 0,
	width: segmentWidth,
	height: segmentHeight,
	fill: 'red',
	stroke: 'black',
	strokeWidth: 4
});

// Randomises the five cards selected for the hand
var shuffledCards = cards.sort(() => 0.5 - Math.random());
var deck = shuffledCards.splice(0, 5);

// turn number variable to ensure hand is less than five
const turnNumber = 0;

cards
	.filter(({ imageURL }) => imageURL !== undefined)
	.forEach(({ title, text, imageURL }, num) => {
		var image = new Image();
		image.src = imageURL;
		var card = new Konva.Rect({
			x: segmentWidth / 2,
			y: segmentHeight / 2,
			width: 200,
			height: 300,
			fillPatternImage: image,
			id: num,
			stroke: 'black',
			strokeWidth: 4,
			draggable: true
		});
		layer2.add(card);
		card.on('click', () => {
			$('#card-text').text(text.trim());
			$('#card-title').text(title.trim());
			$('#myModal').modal();
		});
	});

// Event handler for removal of card goes here
// if deck has less than 5 cards append next card from shuffled deck

layer.add(segment1);
layer.add(segment2);
layer.add(lifePoint);

stage.add(layer);
stage.add(layer2);

// find and change text
// console.log(lifePoint.text('Life Points:10000'));
// layer.draw();
