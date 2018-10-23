var shuffledCards = cards.sort(() => 0.5 - Math.random());
var deck = shuffledCards.splice(0, 5);
var turnNumber = 0;

// test card array
cards = cards.filter(({ imageURL }) => imageURL !== undefined);

var drawCards = () => {
	shuffledCards.forEach(({ title, text, imageURL, damage, defense }, index) => {
		var image = new Image();
		image.src = imageURL;
		var card = new Konva.Rect({
			x: segmentWidth / 2,
			y: segmentHeight / 2,
			width: 200,
			height: 300,
			fillPatternImage: image,
			id: index,
			stroke: 'black',
			strokeWidth: 4,
			draggable: true
		});

		cardLayer.add(card);
		card.on('click', () => {
			$('#card-text').text(text.trim());
			$('#card-title').text(title.trim());
			$('#myModal').modal();
		});

		card.on('dragend', function() {
			console.log('card played');
			turnNumber++;
			deck.shift();
			this.setX(segmentWidth - (3 / 20) * segmentWidth);
			this.setY(segmentHeight / 4);
			this.hide();
			cardLayer.draw();
			if (damage > 0) {
				socket.emit('damage', {
					damage
				});
			} else {
				lifePoints = lifePoints + defense;
				lifePoint.text(`Lifepoint: ${lifePoints}`);
				layer.draw();
			}
		});
	});
};
