
let canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

function createSnow(x,y,r,c,dx,dy){

	let position = {
		x,y,r
	}

	ctx.fillStyle = c;
	ctx.beginPath();
	ctx.arc(position.x,position.y,position.r,0,Math.PI * 2,false);
	ctx.closePath();
	ctx.fill();

	let dyz = 1;

	return {
		...position,
		destroy(array){

			array.splice(0,1);
			console.log(array)

		},
		update(){
			ctx.fillStyle = c;
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,0,Math.PI * 2,false);
			ctx.closePath();
			ctx.fill();
		},
		move(){

			this.x += dx;
			this.y += dyz;

			if(this.x-this.r <= 0 || this.x+this.r >= canvas.width){

				dx = -dx;

			}

			if(this.y >= canvas.height - this.r){

				this.y = -this.y;
				dyz = 1;

			}else{

				dyz += dy;

			}

		}
	}

}


let snow = [];

function addSnow(x = 0,y = 0,r = 0){

	x = Math.random() * canvas.width;
	y = Math.random() * -400;
	r = Math.random() * 5;

	let move = [1,-1];
	let gravity = [0.01,0.02,0.05];

	if(x === 0){

		x += r;

	}

	if(x === canvas.width){

		x -= r;

	}

	snow.push(createSnow(x,y,r,"white",move[Math.round(Math.random() * move.length)],gravity[Math.round(Math.random() * gravity.length)]));

}

for(let x = 0; x < 100; x++){

	addSnow();

}
	
function loop(){

	requestAnimationFrame(loop);
	ctx.clearRect(0,0,canvas.width,canvas.height);
	

	for(let i = 0; i < snow.length; i++){

		let x = snow[i];

		x.move();
		x.update();

	}
	

}

loop();

