		const player = $('#player')

		let keyPressed;
		let playerSpeed = 5;
		let coll = setInterval(col, 5);

		function checkBottom(cb) {

			return cb === "b";

		}

		function checkLeft(cl) {

			return cl === "l";

		}

		function checkRight(cr) {

			return cr === "r";

		}

		function checkTop(ct) {

			return ct === "t";

		}

		function checkFinish(cf) {
		
			return cf === "f";

		}

		function col() {
		
			var collisionList = [collisionCheck(player, $('#floor1')), collisionCheck($('#player'), $('#floor2')), collisionCheck($('#player'), $('#floor3')), collisionCheck($('#player'), $('#floor4')), collisionCheck($('#player'), $('#floor5')), collisionCheck($('#player'), $('#floor6')), collisionCheck($('#player'), $('#wall1')), collisionCheck($('#player'), $('#wall2')), collisionCheck($('#player'), $('#wall3'))];
			
			var col = collision($('#player'), $('#finish'));
			
			if (col === true) {
			
				alert("Congratulations!!!");
				self.location['replace'](location);
				clearInterval(coll);
			
			}
			
			if (!collisionList.some(checkBottom)) {

				$('#player').css("top", '+=2');

			}

			if (collisionList.some(checkLeft)) {

				$('#player').css("left", '+=2');

			}

			if (collisionList.some(checkRight)) {

				$('#player').css("left", '-=2');

			}

			if (collisionList.some(checkTop)) {

				$('#player').css("top", '+=2');

			}
			
		}
		
		document.addEventListener('keydown', function(ev) {
		
			return onkey(ev, ev.keyCode, true);
		
		}, false);
		
		document.addEventListener('keyup', function(ev) {
		
			return onkey(ev, ev.keyCode, false);
		
		}, false);
		
		function onkey(ev, key, down) {
		
			if (down && $('#player').queue("fx").length === 0) {
			
				if (key === 39) {
				
					movePlayerHorizontal("right");
				
				} else if (key === 37) {
				
					movePlayerHorizontal("left");
				
				} else if (key === 38) {
				
					movePlayerUp("up");
				
				}
			
			}
		
		}
		
		function collision($div1, $div2) {
		
			var x1 = $div1.offset().left;
			var y1 = $div1.offset().top;
			var h1 = $div1.outerHeight(true);
			var w1 = $div1.outerWidth(true);
			var b1 = y1 + h1;
			var r1 = x1 + w1;
			var x2 = $div2.offset().left;
			var y2 = $div2.offset().top;
			var h2 = $div2.outerHeight(true);
			var w2 = $div2.outerWidth(true);
			var b2 = y2 + h2;
			var r2 = x2 + w2;

			if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
			return true;
		
		}
		
		function collisionCheck($div1, $div2) {
		
			var vectorX = ($div1.offset().left + ($div1.outerWidth(true) / 2)) - ($div2.offset().left + ($div2.outerWidth(true) / 2)),
				
				vectorY = ($div1.offset().top + ($div1.outerHeight(true) / 2)) - ($div2.offset().top + ($div2.outerHeight(true) / 2)),
				
				halfWidths = ($div1.outerWidth(true) / 2) + ($div2.outerWidth(true) / 2),
				
				halfHeights = ($div1.outerHeight(true) / 2) + ($div2.outerHeight(true) / 2),
				
				collisionDirection = "f";
				
			if (Math.abs(vectorX) < halfWidths && Math.abs(vectorY) < halfHeights) {
			
				var oX = halfWidths - Math.abs(vectorX),
				
					oY = halfHeights - Math.abs(vectorY);
					
				if (oX >= oY) {
				
					if (vectorY > 0) {
					
						collisionDirection = "t";
						
						$div1.offset().top += oY;
					
					} else {
					
						collisionDirection = "b";
						
						$div1.offset().top -= oY;
					
					}
				
				} else {
				
					if (vectorX > 0) {
					
						collisionDirection = "l";
						
						$div1.offset().left += oX;
					
					} else {
					
						collisionDirection = "r";
						
						$div1.offset().left -= oX;
					
					}
				
				}
			
			}
			
			return collisionDirection
		
		}
		
		function movePlayerHorizontal(dir) {
		
			if (dir === "left") {
			
				if ($('#player').position().left > 0) {$('#player').animate({left: '-=5'}, playerSpeed);}
			
			}
			
			if (dir === "right") {
			
				$('#player').animate({left: '+=5'}, playerSpeed);
			
			}
		
		}

		function movePlayerUp(dir, ) {

			if (dir === "up") {

				var c = [collisionCheck($('#player'), $('#floor1')), collisionCheck($('#player'), $('#floor2')), collisionCheck($('#player'), $('#floor3')), collisionCheck($('#player'), $('#floor4')), collisionCheck($('#player'), $('#floor5')), collisionCheck($('#player'), $('#floor6')), collisionCheck($('#player'), $('#wall1')), collisionCheck($('#player'), $('#wall2')), collisionCheck($('#player'), $('#wall3'))];

				if (c.some(checkBottom)) {
					var jump = setInterval(function() {
						$('#player').css({
							top: '-=40'
						}, );
					}, 20);
					var clearjump = setTimeout(function() {
						clearInterval(jump);
					}, 80);
				}
			}
		}