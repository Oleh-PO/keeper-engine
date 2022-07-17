var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
ctx.font = "20px Arial";
var key = {
	87 : "w",
	68 : "d",
	65 : "a",
	83 : "s",
	32 : "spase",
	16 : "shift",
	39 : "->",
	37 : "<-",
	38 : "^",
	40 : "_",
};
var player = {
	x : 100,
	y : 100,
	color : "blue",
	width : 20,
	vector : 0,
	speed : 0,
	stats : {
		maxSpeed : 20,
		maxConteined : 2,
		drilSpeed : 1,
	},
};
var drowPlayer = function (argument) {
	ctx.beginPath();
	ctx.strokeStyle = argument.color;
	ctx.fillStyle = argument.color;
	ctx.arc(argument.x, argument.y, argument.width, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.stroke();
};
var renderSpeed = function(npc) {
	if (npc.speed > npc.stats.maxSpeed) {
		npc.speed = npc.stats.maxSpeed;
	};
	// console.log(npc.speed);
	var y = Math.sqrt(Math.pow(npc.speed , 2) / (1 + Math.pow(Math.tan((npc.vector) * Math.PI / 180), 2)));
	var x = Math.sqrt((npc.speed)*(npc.speed) - (y * y));
	if (npc.vector > 270) {
		x = -x;
	} else if (npc.vector > 180) {
		x = -x;
		y = -y;
	} else if (npc.vector > 90) {
		y = -y;
	};
	npc.x = npc.x + x;
	npc.y = npc.y + y;
	npc.speed = npc.speed - 1;
	if (npc.speed < 0) {
		npc.speed = 0;
	};
};
var npcVector = function(casa, npc) {
	if (npc.speed !== 0) {
		npc.vector = Math.floor(npc.vector + (casa - npc.vector) / 2 + 0.4);
		npc.speed = npc.speed + 3;
	} else {
		npc.vector = casa;
		npc.speed = npc.speed + 3;
	};
	if(npc.vector > 360) {
		npc.vector = npc.vector - 360;
	};
};
document.addEventListener('keydown', (event) => {
	switch (key[event.keyCode]) {
		case "d": 
			npcVector(90, player);
			break;
		case "w": 
			npcVector(180, player);
			break;
		case "a": 
			npcVector(270, player);
			break;
		case "s": 
			npcVector(0, player);
			break;
	};
	renderSpeed(player);
});
setInterval(function() {
	ctx.clearRect(150, 550, 100, 50);
	// ctx.clearRect(0, 0, 2000, 1000);
	// renderSpeed(player);
	drowPlayer(player);
	ctx.fillText(player.vector, 200, 600);

}, 16);