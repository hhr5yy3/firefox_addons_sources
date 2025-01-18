var air = [0,"url(textures/air.png)"];
var grass = [1, "url(textures/grass_block_side.png)"];
var wood = [2,"url(textures/oak_log.png)"];
var stone = [3,"url(textures/stone.png)"];
var sun = [4,"url(textures/sun.png)"];
var leaves = [5,"url(textures/oak_leaves.png)"];
var plyr = [6,"url(textures/oak_log.png)"];
var ironore = [7,"url(textures/iron_ore.png)"];
var goldore = [8,"url(textures/gold_ore.png)"];
var emeraldore = [9,"url(textures/emerald_ore.png)"];
var diamondore = [10,"url(textures/diamond_ore.png)"];
var invfull = 0;
var chunk = 0;
var exist = false;
var nblocks = [0,-1,-2,-3,-4,-5,-7,-8,-9,-10];
var items = [-1,-2,-3,-4,-5,-7,-8,-9,-10];
var world = [[4,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0,
			0,0,0,0,0,0,0,0,0,0,0,0]];
var inv = [0,0,0,0,0,0,0,0,0];
var count = [0,0,0,0,0,0,0,0,0];
var hand = 1;
var slot = 0;
var nslot = 0;
var worldlength = 1;
var r = document.querySelector(":root");
var playerpos = [0,0];
document.addEventListener("click",function(event){
	var id = event.target.id;
	if (id.length != 5){
		world[chunk][id.substr(5,id.length)-1] = negint(world[chunk][id.substr(5,id.length)-1]);
	}else{
		hand = inv[id.substr(4,id.length)-1];
	}
});
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    var id = e.target.id;
    if (world[chunk][id.substr(5,id.length)-1] == 0){
    	world[chunk][id.substr(5,id.length)-1] = hand;
    }
});


window.addEventListener("keydown", checkKeyPress, false);
function checkKeyPress(key){
	//arrowright
    if (key.keyCode == "39" && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1]))){
        if (!nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1] + 1)) && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1])) && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1] - 1))){
            playerpos[1] -= 1;
        }
        playerpos[0] += 1;
        
    }
	//arrowright
    if (key.keyCode == "39" && playerpos[0] == 11){
    	playerpos[0] = 0;
    	chunk += 1;
    	world.push(terrain());
    }
	//ArrowLeft
    if (key.keyCode == "37" && playerpos[0] >= 1 && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1]))){
        if (!nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1] + 1)) && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1])) && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1] - 1))){
            playerpos[1] -= 1;
        }
        playerpos[0] -= 1;
    }
	//Arrowleft
    if (key.keyCode == "37" && playerpos[0] == 0){
    	chunk -= 1;
    	playerpos[0] = 11;
    }
	//Space
    if (key.keyCode == "32" && playerpos[1] >= 4 && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && !nblocks.includes(getBlock(playerpos[0], playerpos[1] + 2))){
        playerpos[1] -= 4;
    }
	//Space
    if (key.keyCode == "38" && playerpos[1] >= 4 && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && !nblocks.includes(getBlock(playerpos[0], playerpos[1] + 2))){
        playerpos[1] -= 4;
    }
	//a (left)
	if (key.keyCode == "65" && playerpos[0] >= 1 && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1]))){
        if (!nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1] + 1)) && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1])) && nblocks.includes(getBlock(playerpos[0] - 1, playerpos[1] - 1))){
            playerpos[1] -= 1;
        }
        playerpos[0] -= 1;
    }
	//d (right)
	if (key.keyCode == "68" && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1]))){
        if (!nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1] + 1)) && nblocks.includes(getBlock(playerpos[0], playerpos[1] - 1)) && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1])) && nblocks.includes(getBlock(playerpos[0] + 1, playerpos[1] - 1))){
            playerpos[1] -= 1;
        }
        playerpos[0] += 1;
        
    }
}
function terrain(){
	var list = [4,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,0,0,0,0,0];
	var op = [1,-1,0,0,0,0,0,0,0,0,0,0];
	var trty = ['n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n','n',1,2,3,4];
	var ore = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,10];
	var x = 0;
	var y = 0;
	var rnum = op[Math.floor(Math.random() * 12)];
	for (var i = 0; i <= 11; i+=1){
		if (i == 0 && world.length == 1){
			worldlength += 1;
			y = Math.floor(Math.random() * 10 + 2);
			list[y*12+i] = 1;
			for (var height = y + 1; height <= 11; height++){
				list[height*12+i] = 3;	
			}
		}
		if (world.length > 1){
			for (var g = 0; g < 11; g++){
				console.log(world[chunk-1][g*12+11]);
				if (world[chunk-1][g*12+11] != 0){
					y = g;
					break;
				}
			}
			list[y*12+i] = 1;
			for (var height = y + 1; height <= 11; height++){
				list[height*12+i] = 3;	
			}
		}
		if (i != 0){
			if (y > 4 && y < 11){
				rnum = op[Math.floor(Math.random() * 3)];
			}
			if (y <= 3){
				rnum = op[0];
			}
			if (y >= 9){
				rnum = op[Math.floor(Math.random() * 11 + 1)];
			}
			y += rnum;
			list[y*12+i] = 1;
			settree(i,y-1,trty[Math.floor(Math.random()*32)],chunk);
			for (var height = y + 1; height <= 11; height++){
				list[height * 12 + i] = ore[Math.floor(Math.random()*ore.length)];
			}
		}
	}
	return list;
}
world[chunk] = terrain();
function setblock(x,y,block,chunk,listtrue){
	//if (listtrue){
		//list[y * 12 + x] = block;
		//return;
	//}
	world[chunk][y * 12 + x] = block;
}

function settree(x,y,type,chunk,){
	return;
	if (type == 'n'){
		return;
	}
	if (type == 1){
		setblock(x,y,2,chunk,true);
		setblock(x,y-1,2,chunk,true);
		setblock(x,y-2,5,chunk,true);
		setblock(x-1,y-2,5,chunk,true);
		setblock(x+1,y-2,5,chunk,true);
		setblock(x,y-3,5,chunk,true);
	}
	if (type == 2){
		setblock(x,y,2,chunk,true);
		setblock(x,y-1,2,chunk,true);
		setblock(x,y-2,5,chunk,true);
		setblock(x-1,y-2,5,chunk,true);
		setblock(x-2,y-2,5,chunk,true);
		setblock(x+1,y-2,5,chunk,true);
		setblock(x+2,y-2,5,chunk,true);
		setblock(x-1,y-3,5,chunk,true);
		setblock(x-2,y-3,5,chunk,true);
		setblock(x+1,y-3,5,chunk,true);
		setblock(x+2,y-3,5,chunk,true);
		setblock(x,y-4,5,chunk,true);
		setblock(x-1,y-4,5,chunk,true);
		setblock(x+1,y-4,5,chunk,true);
		setblock(x,y-5,5,chunk,true);
		setblock(x-1,y-5,5,chunk,true);
		setblock(x+1,y-5,5,chunk,true);
		setblock(x,y-3,5,chunk,true);
	}
	if (type == 3){
		setblock(x,y,2,chunk,true);
		setblock(x,y-1,2,chunk,true);
		setblock(x,y-2,5,chunk,true);
		setblock(x-1,y-2,5,chunk,true);
		setblock(x+1,y-2,5,chunk,true);
		setblock(x,y-3,5,chunk,true);
		setblock(x-1,y-3,5,chunk,true);
		setblock(x+1,y-3,5,chunk,true);
		setblock(x,y-4,5,chunk,true);
		
	}
	if (type == 4){
		setblock(x,y,2,chunk,true);
		setblock(x,y-1,2,chunk,true);
		setblock(x,y-2,2,chunk,true);
		setblock(x,y-3,5,chunk,true);
		setblock(x-1,y-3,5,chunk,true);
		setblock(x+1,y-3,5,chunk,true);
		setblock(x,y-4,5,chunk,true);
	}
}



function draw(chunk){
	for (var i = 0; i <= 143; i++) {
		var block = document.querySelector("#block"+(i+1));
		block.style.backgroundSize = "cover";
		if (world[chunk][i] == air[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,air[1]);
		}
		if (world[chunk][i] == grass[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,grass[1]);
		}
		if (world[chunk][i] == wood[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,wood[1]);
		}
		if (world[chunk][i] == stone[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,stone[1]);
		}
		if (world[chunk][i] == sun[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,sun[1]);
		}
		if (world[chunk][i] == leaves[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,leaves[1]);
		}
		if (world[chunk][i] == ironore[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,ironore[1]);		
		}
		if (world[chunk][i] == goldore[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,goldore[1]);
		}
		if (world[chunk][i] == emeraldore[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,emeraldore[1]);
		}
		if (world[chunk][i] == diamondore[0] && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			blck(i,diamondore[1]);
		}
		if (world[chunk][i] == negint(grass[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(wood[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(stone[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(leaves[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(ironore[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(goldore[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i)
		}
		if (world[chunk][i] == negint(emeraldore[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
		if (world[chunk][i] == negint(diamondore[0]) && playerpos[1] * 12 + playerpos[0]+1 != i+1){
			item(i);
		}
	}
	for (var a = 0; a <= 8; a++){
		if (inv[a] == air[0]){
			r.style.setProperty("--item"+String(a+1),air[1]);
		}
		if (inv[a] == grass[0]){
			r.style.setProperty("--item"+String(a+1),grass[1]);
		}
		if (inv[a] == wood[0]){
			r.style.setProperty("--item"+String(a+1),wood[1]);
		}
		if (inv[a] == stone[0]){
			r.style.setProperty("--item"+String(a+1),stone[1]);
		}
		if (inv[a] == leaves[0]){
			r.style.setProperty("--item"+String(a+1),leaves[1]);
		}
		if (inv[a] == ironore[0]){
			r.style.setProperty("--item"+String(a+1),ironore[1]);
		}
		if (inv[a] == goldore[0]){
			r.style.setProperty("--item"+String(a+1),goldore[1]);
		}
		if (inv[a] == emeraldore[0]){
			r.style.setProperty("--item"+String(a+1),emeraldore[1]);
		}
		if (inv[a] == diamondore[0]){
			r.style.setProperty("--item"+String(a+1),diamondore[1]);
		}
	}
	for (var d = 0; d <= 8; d++){
		if (count[d] > 0){
			document.getElementById("count"+(d+1)).innerHTML = count[d];
		}
	}
	r.style.setProperty("--block"+(playerpos[1] * 12 + playerpos[0]+1),plyr[1]);
	r.style.setProperty("--block"+((playerpos[1]+1) * 12 + playerpos[0]+1),plyr[1]);
	for (var h = 0; h <= 8; h++){
		if (inv[h] != 0){
			invfull++;
		}else{
			invfull	= 0;
			break;
		}
	}

	if (items.includes(getBlock(playerpos[0],playerpos[1])) && invfull != 9){
		for (var d = 0; d <= 8; d++){
			if (inv[d] == Math.abs(getBlock(playerpos[0],playerpos[1])) && count[d] <= 63){
				exist = true;
				nslot = d;
				break;
			}else{
				exist = false;
			}
		}
		if (count[slot] == 64 || inv[slot] != Math.abs(getBlock(playerpos[0],playerpos[1])) && inv[slot] != 0){
			if (!exist){
				slot += 1;
				inv[slot] = Math.abs(world[chunk][(playerpos[1]) * 12 + playerpos[0]]);
			}
		}
		if (!exist){
			inv[slot] = Math.abs(world[chunk][(playerpos[1]) * 12 + playerpos[0]]);
			count[slot] += 1;
			world[chunk][playerpos[1] * 12 + playerpos[0]] = 0;
		}else{
			inv[nslot] = Math.abs(world[chunk][(playerpos[1]) * 12 + playerpos[0]]);
			count[nslot] += 1;
			world[chunk][playerpos[1] * 12 + playerpos[0]] = 0;
		}
	}
	if (items.includes(getBlock(playerpos[0],playerpos[1]+1)) && invfull != 9){
		for (var d = 0; d <= 8; d++){
			if (inv[d] == Math.abs(getBlock(playerpos[0],playerpos[1]+1)) && count[d] <= 63){
				exist = true;
				nslot = d;
				break;
			}else{
				exist = false;
			}
		}
		if (count[slot] == 64 || inv[slot] != Math.abs(getBlock(playerpos[0],playerpos[1]+1)) && inv[slot] != 0){
			if (!exist){
				slot += 1;
				inv[slot] = Math.abs(world[chunk][(playerpos[1]+1) * 12 + playerpos[0]]);
			}
		}
		if (!exist){
			inv[slot] = Math.abs(world[chunk][(playerpos[1]+1) * 12 + playerpos[0]]);
			count[slot] += 1;
			world[chunk][(playerpos[1]+1)* 12 + playerpos[0]] = 0;
		}else{
			inv[nslot] = Math.abs(world[chunk][(playerpos[1]+1) * 12 + playerpos[0]]);
			count[nslot] += 1;
			world[chunk][(playerpos[1]+1) * 12 + playerpos[0]] = 0;
		}
	}

}

function item(a){
	var block = document.querySelector("#block"+(a+1));
	block.style.backgroundSize = "auto";
}
function blck(b,block){
	var r = document.querySelector(":root");
	r.style.setProperty("--block"+String(b+1),block);
}
function physics(){
	var px = playerpos[0];
	var py = playerpos[1];
	var ppos = (py+2) * 12 + px;
	if (!nblocks.includes(world[chunk][ppos])){
		return;
	}
	playerpos[1] += 1;

}

function negint(num){
	return -Math.abs(num);
}
function getBlock(x,y){
	return world[chunk][y*12+x];
}
function itemphysics(){
	for (var f = 0; f <= 143; f++){
		if (items.includes(world[chunk][f]) && nblocks.includes(world[chunk][f + 12])){
			var itemy = f;
			var interval = setInterval(function (){
				if (nblocks.includes(world[chunk][f+12])){
					alert('hi');
					itemy += 12;
					world[chunk][itemy-12] = 0;
					world[chunk][itemy] = world[chunk][itemy-12];
				}else{
					clearInterval(interval);
				}
			}, 100);
		}
	}
}
 

setInterval(physics,100);
setInterval(function(){draw(chunk);},1);
setInterval(itemphysics,100);
