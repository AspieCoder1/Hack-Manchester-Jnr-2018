var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height
});
var layer = new Konva.Layer();
segmentWidth = window.innerWidth / 2;
segmentHeight = window.innerHeight;

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

var layer2 = new Konva.Layer();

cards.forEach(({ title, text }, num) => {
	var card = new Konva.Rect({
		x: segmentWidth / 2,
		y: segmentHeight / 2,
		width: 200,
		height: 300,
		id: num,
		fill: 'purple',
		stroke: 'black',
		strokeWidth: 4,
		draggable: true
	});
	layer2.add(card);
	card.on('click', () => {
		// Generate Modal in bootstrap
		$('#card-text').text(text);
		$('#card-title').text(title);
		$('#myModal').modal();
	});
});
// add the shape to the layer
layer.add(segment1);
layer.add(segment2);
layer.add(lifePoint);

// add the layer to the stage
stage.add(layer);
stage.add(layer2);

// find and change text
console.log(lifePoint.text('Life Points:10000'));
layer.draw();
