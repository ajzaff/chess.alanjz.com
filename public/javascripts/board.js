function board_position(board, fen) {
	var lightColor = '#BFF7F0'
	var darkColor = '#82A9F6'
	var squareSize = 64
	var c = board[0]
	c.width = 8*squareSize
	c.height = 8*squareSize
	var ctx = c.getContext("2d")
	
	
	
	var fillStyle = function(r,c) {
		if(r % 2 == c % 2) return lightColor
		else return darkColor
	}
	var isNumeric = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}	
	var consumeToken = function() {
		piece_image = null
		var c = fen.charAt(0)
		if(c == 'P') piece_image = '/assets/images/pawn-white-sm.png'
		else if(c == 'N') piece_image = '/assets/images/knight-white-sm.png'
		else if(c == 'B') piece_image = '/assets/images/bishop-white-sm.png'
		else if(c == 'R') piece_image = '/assets/images/rook-white-sm.png'
		else if(c == 'Q') piece_image = '/assets/images/queen-white-sm.png'
		else if(c == 'K') piece_image = '/assets/images/king-white-sm.png'
		else if(c == 'p') piece_image = '/assets/images/pawn-black-sm.png'
		else if(c == 'n') piece_image = '/assets/images/knight-black-sm.png'
		else if(c == 'b') piece_image = '/assets/images/bishop-black-sm.png'
		else if(c == 'r') piece_image = '/assets/images/rook-black-sm.png'
		else if(c == 'q') piece_image = '/assets/images/queen-black-sm.png'
		else if(c == 'k') piece_image = '/assets/images/king-black-sm.png'
		if(isNumeric(c)) { // empty handler
			var num = parseInt(c)
			if(num > 1) fen = "" + (num-1) + fen.substring(1)
			else fen = fen.substring(1)
		}
		else fen = fen.substring(1)	// default handling
		if(fen.charAt(0) == '/') fen = fen.substring(1)
		return piece_image
	}

	var ImagePromise = function(piece, row, col) {
		this.piece = piece
		this.row = row
		this.col = col

		var that = this
		var image = new Image()
		image.onload = function() {
			ctx.drawImage(image,that.row*squareSize,that.col*squareSize)
		}
		image.src = piece
	}

	/*var consumeToken = function() {
		piece_image = null
		var c = fen.charAt(0)
		if(c == 'P') piece_image = '♙'
		else if(c == 'N') piece_image = '♘'
		else if(c == 'B') piece_image = '♗'
		else if(c == 'R') piece_image = '♖'
		else if(c == 'Q') piece_image = '♕'
		else if(c == 'K') piece_image = '♔'
		else if(c == 'p') piece_image = '♟'
		else if(c == 'n') piece_image = '♞'
		else if(c == 'b') piece_image = '♝'
		else if(c == 'r') piece_image = '♜'
		else if(c == 'q') piece_image = '♛'
		else if(c == 'k') piece_image = '♚'
		if(isNumeric(c)) { // empty handler
			var num = parseInt(c)
			if(num > 1) fen = "" + (num-1) + fen.substring(1)
			else fen = fen.substring(1)
		}
		else fen = fen.substring(1)	// default handling
		if(fen.charAt(0) == '/') fen = fen.substring(1)
		return piece_image
	}*/

	var row,col // (0,0) is A8
	for(col=0; col < 8; col++)
		for(row=0; row < 8; row++) {
			ctx.fillStyle = fillStyle(row,col)
			ctx.fillRect(row*squareSize,col*squareSize,squareSize,squareSize)
			piece = consumeToken()
			/*if(piece != null) {
				ctx.fillStyle = 'black';
				ctx.font = '80px verdana'
				ctx.fillText(piece,row*squareSize,col*squareSize+57,squareSize);
			}*/
			if(piece != null) new ImagePromise(piece,row,col)
		}
}
