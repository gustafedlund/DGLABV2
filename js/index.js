// HTML DOM VARIABLES
var body = document.getElementsByTagName("body");
var gameBoard = document.getElementById("gameBoard");
var midSection = document.getElementById("midSection");
var shop = document.getElementById("shop");
var stats = document.getElementById("stats");
var player = document.getElementById("player");
var computerSim = document.getElementById("computerSim");
var playerVotes = document.getElementById("votes");
var notice = document.getElementById("messageArea");
var messageArea = document.getElementById("messageArea");
var shopNav = document.getElementsByClassName("shopNav");
var shopPage = document.getElementsByClassName("shopPage");

var alliansPartier = ["l", "kd", "c", "m"];
var rgPartier = ["vp", "mp", "mp", "s"];


/*var mainTheme = new Audio('bensound-ukulele.mp3');
mainTheme.play();
var click = new Audio('click.wav');
click.play();
var lockedClick = new Audio('lockedClick.wav');
lockedClick.play();
var purchase = new Audio('purchase.wav');
purchase.play();*/

//Vilket lag?
var Alliansen = false;
var RödGröna = false;
//välj lag från landingpage
function valjAl() {
	document.getElementById("cover").style.display = "none";
	Alliansen = true;
	char = teamBlue;
	farger();
	gameLoad();
	endGame.timeStart();
	newMessage("hallå hallå, du som spelar för blå. klicka på kuvertet för att börja samla röster!");
}
function valjRg() {
	document.getElementById("cover").style.display = "none";
	RödGröna = true;
	char = teamRed;
	farger();
	gameLoad();
	endGame.timeStart();
	newMessage("nämen hej, så rödgrön är för dig? klicka på kuvertet för att börja samla röster!")
}
document.getElementById("chooseA").addEventListener("click", valjAl);
document.getElementById("chooseRG").addEventListener("click", valjRg);
//funktion som sätter färg bereoende på lag
function farger() {
	if(Alliansen == true) {
		body[0].style.backgroundColor = "#EC922B";
		player.style.backgroundColor = "#2B85EC";
		computerSim.style.backgroundColor = "#d22d2d";
		gameBoard.style.backgroundColor = "#2B85EC";
		gameBoard.style.borderRight = "5px solid #EC922B";
		midSection.style.backgroundColor = "#2B85EC";
		midSection.style.borderRight = "5px solid #EC922B";
		specs.style.backgroundColor = "#2B85EC";
		specs.style.color = "#EC922B";
		opener.style.backgroundColor = "#EC922B";
		opener.style.color = "#2B85EC";
		closer.style.backgroundColor = "#EC922B";
		closer.style.color = "#2B85EC";
		shopNav[0].style.backgroundColor = "#2B85EC";
		shopNav[0].style.color = "#EC922B";
		for (var i = 1; i < shopNav.length; i++) {
			shopNav[i].style.color = "#EC922B";
		}
		for (var j = 0; j < shopPage.length; j++) {
			shopPage[j].style.backgroundColor = "#2B85EC";
		}
		document.getElementById("gudrun").setAttribute("style", "border-color: #EC922B;");
		document.getElementById("palme").setAttribute("style", "border-color: #EC922B;");
		document.getElementById("kungen").setAttribute("style", "border-color: #EC922B;");
		document.getElementById("trade4token").setAttribute("style", "background-color: #EC922B;");
		document.getElementById("buyToken").setAttribute("style", "color: #EC922B;");
	} else {
		body[0].style.backgroundColor = "#2dd2d2";
		player.style.backgroundColor = "#d22d2d";
		computerSim.style.backgroundColor = "#2B85EC";
		gameBoard.style.backgroundColor = "#d22d2d";
		gameBoard.style.borderRight = "5px solid #2dd2d2";
		midSection.style.backgroundColor = "#d22d2d";
		midSection.style.borderRight = "5px solid #2dd2d2";
		specs.style.backgroundColor = "#2dd2d2";
		specs.style.color = "#d22d2d";
		opener.style.backgroundColor = "#2dd2d2";
		opener.style.color = "#d22d2d";
		closer.style.backgroundColor = "#2dd2d2";
		closer.style.color = "#d22d2d";
		shopNav[0].style.backgroundColor = "#d22d2d";
		shopNav[0].style.color = "#2dd2d2";
		for (var k = 1; k < shopNav.length; k++) {
			shopNav[k].style.color = "#2dd2d2";
		}
		for (var l = 0; l < shopPage.length; l++) {
			shopPage[l].style.backgroundColor = "#d22d2d";
		}
		document.getElementById("gudrun").setAttribute("style", "border-color: #2dd2d2;");
		document.getElementById("palme").setAttribute("style", "border-color: #2dd2d2;");
		document.getElementById("kungen").setAttribute("style", "border-color: #2dd2d2;");
		document.getElementById("trade4token").setAttribute("style", "background-color: #2dd2d2;");
		document.getElementById("buyToken").setAttribute("style", "color: #2dd2d2;");
	}
}
//top-progressbar: illustrerar hur många röster spelaren & boten har
function showProgress() {
	//spelarens röster
	document.getElementById("player").style.width = votes * (50/3500000) + "%";
	//visa röster PÅ progressbar tills det finns plats att visa I bar
		if (votes.toFixed(0).toString().length < 6) {
			document.getElementById("playerLess").innerText = votes.toFixed(0);
				if (Alliansen == true) {
					document.getElementById("playerLess").setAttribute("style", "color: #2B85EC;");
				} else {
					document.getElementById("playerLess").setAttribute("style", "color: #d22d2d;");
				}
		} else {
			document.getElementById("playerLess").innerText = "";
			document.getElementById("playervotes").innerText = votes.toFixed(0);
			document.getElementById("playervotes").setAttribute("style", "color: #fff; position: static; display: flex; justify-content: flex-end;");
		}
	//boten annas röster
	document.getElementById("computerSim").style.width = botVotes * (50/3500000) + "%";
	//visa röster PÅ progressbar tills det finns plats att visa I bar
		if (botVotes.toFixed(0).toString().length < 6) {
			document.getElementById("botLess").innerText = botVotes.toFixed(0);
				if (Alliansen == true) {
					document.getElementById("botLess").setAttribute("style", "color: #d22d2d;");
				} else {
					document.getElementById("botLess").setAttribute("style", "color: #2B85EC;");
				}
		} else {
			document.getElementById("botLess").innerText = "";
			document.getElementById("botvotes").innerText = botVotes.toFixed(0);
			document.getElementById("botvotes").setAttribute("style", "color: #fff; position: static; display: flex; justify-content: flex-start;");
		}
}
//midSection - specs
var opener = document.getElementById("opener");
var closer = document.getElementById("closer");
var specs = document.getElementById("specs");
function viewSpecs() {
	opener.setAttribute("style", "display: none");
	closer.setAttribute("style", "display: inline;");
	specs.setAttribute("style", "display: inline");
	if (Alliansen == true) {
		specs.style.backgroundColor = "#EC922B";
		specs.style.color = "#2B85EC";
		opener.style.backgroundColor = "#EC922B";
		opener.style.color = "#2B85EC";
		closer.style.backgroundColor = "#EC922B";
		closer.style.color = "#2B85EC";
	} else {
		specs.style.backgroundColor = "#2dd2d2";
		specs.style.color = "#d22d2d";
		opener.style.backgroundColor = "#2dd2d2";
		opener.style.color = "#d22d2d";
		closer.style.backgroundColor = "#2dd2d2";
		closer.style.color = "#d22d2d";
	}
}
function closeSpecs() {
	opener.setAttribute("style", "display: inline");
	closer.setAttribute("style", "display: none;");
	specs.setAttribute("style", "display: none");
	if (Alliansen == true) {
		specs.style.backgroundColor = "#EC922B";
		specs.style.color = "#2B85EC";
		opener.style.backgroundColor = "#EC922B";
		opener.style.color = "#2B85EC";
		closer.style.backgroundColor = "#EC922B";
		closer.style.color = "#2B85EC";
	} else {
		specs.style.backgroundColor = "#2dd2d2";
		specs.style.color = "#d22d2d";
		opener.style.backgroundColor = "#2dd2d2";
		opener.style.color = "#d22d2d";
		closer.style.backgroundColor = "#2dd2d2";
		closer.style.color = "#d22d2d";
	}
}
opener.addEventListener("click", viewSpecs);
closer.addEventListener("click", closeSpecs);
//sidebar; shop - navigating through tabs
function visaSida(sida) {
	var currentPage = document.getElementsByClassName(sida);
	var politiker = document.getElementById("politiker");
	var uppgr = document.getElementById("uppgr");
	var legender = document.getElementById("legender");

	politiker.style.display = "none";
  uppgr.style.display = "none";
  legender.style.display = "none";

	if (Alliansen == true) {
		//change color of inactive buttons
		for (var i = 0; i < shopNav.length; i++) {
			shopNav[i].style.backgroundColor = "#fff";
			shopNav[i].style.color = "#2B85EC";
		}
		currentPage[0].style.backgroundColor = "#2b85ec";
		currentPage[0].style.color = "#EC922B";
	} else {
		for (var j = 0; j < shopNav.length; j++) {
			shopNav[j].style.backgroundColor = "#fff";
			shopNav[j].style.color = "#2dd2d2";
		}
		currentPage[0].style.backgroundColor = "#d22d2d";
	}
  currentPage[1].style.display = "inline";
}
//messages
function newMessage(message) {
	messageArea.innerHTML = ""
	messageArea.style.display = "inline";
	if (Alliansen == true) {
		messageArea.style.color = "#2B85EC";
	} else {
		messageArea.style.color = "#d22d2d";
	}
	var msg = document.createElement("p");
	msg.className = "message";
	msg.innerText = message;
	messageArea.appendChild(msg);

	var closeMessage = document.createElement("SPAN");
	closeMessage.classList.add("closeMessage");
	messageArea.appendChild(closeMessage);
		function close() {
			messageArea.style.display = "none";
		}
	closeMessage.addEventListener("click", close);
}

var rosta = document.getElementById('rostaAv');
function kuvertNed() {
	rosta.setAttribute('id', 'rosta');
}
function kuvertUpp() {
	rosta.setAttribute('id', 'rosta2');
}
function kuvertHover() {
	rosta.setAttribute('id', 'rostaHover');
}
function kuvertAv() {
	rosta.setAttribute('id', 'rostaAv');
}


// GAME LOGIC *********************************************************************************************************************
var votes = 0;

//Coin logic
var coinAmount = 0;
var coinValue = 5;
var recentCoinSpawn = false;
var tokenAmount = 0;

//Vilket lag?
var Alliansen = false;
var RödGröna = false;

//Röster/s variabler
var votesPerSec = 0;
//Klickvariabler

var vps = //Objekt som håller allt nödvändigt för votes per sec
{
	votesPerSec: 0,
	vpsValue: 0,  //Värdet som kommer från karaktärer
	vpsMultiplier: 1, //Multiplier från uppgraderingar
	talentVpsMultiplier: 1, //Multiplier från talent tree
	totalVpsMulti: 1, //Den totala multipliern


	vpsCalc: function() //Kalkylerar och returnerar votes per sec.
	{
		var vpsCalc = this.totVpsValue() * this.totMultiplier();
		this.votesPerSec = vpsCalc;
		return vpsCalc;
	},
	totVpsValue: function() //Räknar ut summan av alla karaktärers vps
	{
		var sum = 0;
		for (var i = 0; i < char.length; i++)
		{
			sum += char[i].accumvps;
		}
		this.vpsValue = sum;
		return sum;
	},
	totMultiplier: function() //Räknar ut den totala multipliern
		{
			totalVpsMulti	= this.vpsMultiplier * this.talentVpsMultiplier;
			this.totalVpsMulti = totalVpsMulti;
			return totalVpsMulti;
	},
}
var click = //Objekt som håller allt nödvändigt för clicks
{
	votesPerClick: 1, //Det totala/sammanställda värdet per klick
	clickValue: 1, //Startvärdet på ett klick
	clickMultiplier: 1, //Multiplier från uppgraderingar
	talentClickMultiplier: 1, //Multiplier från talent tree
	totalMultiplier: 1,

	vpsRatio: 0, // Bonusen via vps är baserad på detta
	vpsBonus: 0, // Den fasta bonusen som skapas av vps:en

	bonusPerChar: false,

	clickCalc: function() //Ränar den sammanställda votes per click
	{
		var summed = this.characterBonus() + this.bonusByVps() + this.clickValue * this.totMultiplier();
		this.votesPerClick = summed;
		return summed;
	},
	totMultiplier: function() //Räknar ut den totala multipliern
	{
		var totalMultiplier = 1;
		totalMultiplier = this.clickMultiplier * this.talentClickMultiplier;
		this.totalMultiplier = totalMultiplier;
		return totalMultiplier;
	},
	bonusByVps: function() //Räknar ut bonus per klick baseradd på vps
	{
		var bonus = vps.votesPerSec * this.vpsRatio;
		this.vpsBonus = bonus;
		return bonus;
	},
	characterBonus: function() //Ger bonus som motsvarar antalet ägda karaktärer om viss uppgradering är upplåst.
	{
		if (this.bonusPerChar === true)
		{
			var sum = 0;
			for (var i = 0; i < char.length; i++)
			{
				sum += char[i].quantity;
			}
			return sum;
		}
		return 0;
	},
}


//Första inladdningen
function gameLoad() //Function that is activated on website load.
{
  incrementPerSec();
}

/*/Funktioner
---------------
---------------/*/
function incrementPerSec() //Kollar antalet röster per sekund och genererar dessa
{
  setInterval(function(){votes += (vps.votesPerSec/60);}, 1000/60);
}

function refresh() //Värden, element och dylikt som behöver frekvent uppdatering
{
	playerVotes.innerHTML = votes.toFixed(0);
	counter.innerHTML = coinAmount.toFixed(1) + " SEK";
	document.getElementById("vps").innerHTML = "per sekund: " + vps.votesPerSec.toFixed(0);
	tokenConvert.tokenDOM.innerHTML = tokenAmount;

  vps.vpsCalc();
	click.clickCalc();
	refreshSpecs();
	showProgress();
	endGame.check();
}

function claimVote() //Klicka på kakan för att få poäng
{
  votes+=click.votesPerClick;
	statistics.totalVotes += click.votesPerClick;
	++statistics.totalClicks;
	coinRng = Math.floor(Math.random()*20);
	coinRngSetting = 19;
	if (coinRng >= coinRngSetting)
	{
		reasonableCoinSpawn();
	}
}



//Game Loop
function gameloop()
{
  refresh();
  //Letar efter nya karaktärer
  for (var i = 0; i < teamBlue.length; i++)
  {
    lookForNewCharacter(i);
  }
  for (var j = 0; j < upgrades.length; j++)
  {
    lookForNewUpgrade(j);
  }

	statistics.getValues(); //Updates statistics
}
var loopInterval = setInterval(gameloop, 33);

//unlock characters
function unlockCharacter(i) { //Låser upp karaktärer i spelet
	//karaktärsurval beroende på parti
  if (Alliansen === true) {
    var char = teamBlue[i];
    var divId = "frame " + char.name;
    var quantityId = "quantity " + char.name; //Skapa string till unikt id på elementet med kvantiteten
    var costId = "cost " + char.name; // --||--
    var vpsId = "vps " + char.name;
    var nameId = "name " + char.name;
    var onclickLoad = "teamBlue["+i+"].load()"; //Laddar funktionen till objektet i fråga
  } else {
   	var char = teamRed[i];
    var divId = "frame " + char.name;
    var quantityId = "quantity " + char.name; //Skapa string till unikt id på elementet med kvantiteten
    var costId = "cost " + char.name; // --||--
    var nameId = "name " + char.name;
    var onclickLoad = "teamRed["+i+"].load()";
  }
	//skapa en div i vilken karaktären ska visas
	var createDiv = document.createElement("div");
	  createDiv.setAttribute("id", divId); //ge var karaktärs div ett unikt id
		createDiv.className = "char"; //ge class till karaktärsdiv
		createDiv.setAttribute("onclick", onclickLoad); //ladda objektets funktion när div:en klickas på
		createDiv.style.backgroundImage = char.lockedImage; //tillfällig bild innan karaktären visas
	//skapa element för karaktärens namn
	var createName = document.createElement("h2");
		createName.setAttribute("id", nameId);
	  createName.className = "name";
			var NameText = document.createTextNode("??????"); //tillfälligt namn innan karaktären visas (visas först när en har råd)
	//skapa span element som visar kostnaden
  var createCost = document.createElement("span");
		createCost.setAttribute("id", costId); //Lägger till ID som tillåter framtida ändring
	  createCost.className = "pricetag"; //class för pricetag utseende
		createCost.innerHTML = "kostnad: " + char.cost + "R";
	//skapa h2 element som visar hur många av en karaktär spelaren har
  var createQuantity = document.createElement("h2");
		createQuantity.setAttribute("id", quantityId);
		createQuantity.className = "characterQuantity";
		createQuantity.innerText = char.quantity + " x ";
		createQuantity.setAttribute("style", "display: inline;");
	//skapa element som visas när en hovrar över karaktärsdiven
	var info = document.createElement("div");
		info.className = "info";
		info.innerText = char.info;
		createDiv.appendChild(info);
	var createRPS = document.createElement("p");
	  var RPSText = document.createTextNode("Varje " + char.name + " ger " + char.vps + " röster per sekund. Totalt " + char.accumvps + " röster per sekund.");
		createRPS.appendChild(RPSText);
	  createRPS.className = "characterTotalVps";
	  createRPS.setAttribute("id", vpsId);
		info.appendChild(createRPS);
	//sätt färg runt karaktärsdiv beroende på lag
	if (Alliansen == true) {
		createCost.setAttribute("style", "text-shadow: -2px 0 #2B85EC, 0 2px #2B85EC, 2px 0 #2B85EC, 0 -2px #2B85EC");
	} else {
		createCost.setAttribute("style", "text-shadow: -2px 0 #d22d2d, 0 2px #d22d2d, 2px 0 #d22d2d, 0 -2px #d22d2d");
	}
	//appenda alla nya element till diven där karaktären visas
  createDiv.appendChild(createName);
  createDiv.appendChild(createCost);
  createName.appendChild(NameText);
	//appenda karaktärsdiven till boxen där karaktärerna visas (i shop - sida "politiker")
  document.getElementById("politiker").appendChild(createDiv);
}

function lookForNewCharacter(i) //Skannar efter möjlighet att låsa upp nya saker
{
  if (Alliansen === true)
  {
    var char = teamBlue[i];
  }
  else if (RödGröna === true)
  {
    var char = teamRed[i];
  }
  //Lås upp karaktären ifall en snart har råd (tillfällig låst bild)
  if (votes >= char.cost/3 && char.unlocked === false)
  {
    unlockCharacter(i);
    char.unlock();
  }
  //Lås upp karaktärsbilden helt ifall en har råd
  if (votes >= char.cost && char.unlocked === true) {
    document.getElementById("frame " + char.name).style.backgroundImage = char.image;
    document.getElementById("name " + char.name).innerHTML = char.quantity + " x " + char.name + " (" + char.party + ")";
		//ge class så att hover - effekten bara fungerar om karaktären är upplåst och spelaren har råd
			document.getElementById("frame " + char.name).classList.add("active");
  }
  //Kod för att fejda ut karaktär om en inte har råd
  if (votes < char.cost && char.unlocked === true) {
    document.getElementById("frame " + char.name).style.opacity = "0.6";
		//ta bort class så att hover inte funkar när karaktären inte kan köpas
		document.getElementById("frame " + char.name).classList.remove("active");
		if(Alliansen === true) {
			document.getElementById("frame " + char.name).style.border = "#EC922B 3px dashed";
		} else {
			document.getElementById("frame " + char.name).style.border = "#2dd2d2 3px dashed";
		}
  }
  //Kod för att ta bort fejden när en har råd
  else if (votes > char.cost && char.unlocked === true) {
    document.getElementById("frame " + char.name).style.opacity = "1";
  }
return;
}


function unlockUpgrade(i)
{
	//skapar span och info för uppgradering
  var createDiv = document.createElement("div");
  var divId = upgrades[i].name;
  var createName = document.createElement("h2");
  var nameText = document.createTextNode(upgrades[i].name);
  var createDesc = document.createElement("p");
  var descText = document.createTextNode(upgrades[i].description);
  var createCost = document.createElement("p");
  var costText = document.createTextNode(upgrades[i].cost + upgrades[i].valuta);
  createDiv.setAttribute("onclick", "upgrades["+i+"].load()");
	createDiv.id = divId;
	createDiv.className = "upgradeFrame";
  createName.className = "upgradeName";
  createDesc.className = "upgradeDescription";
  createCost.className = "upgradeCostText";

  createDiv.appendChild(createName);
  createDiv.appendChild(createDesc);
  createDiv.appendChild(createCost);
  createName.appendChild(nameText);
  createDesc.appendChild(descText);
  createCost.appendChild(costText);
  document.getElementById("uppgr").appendChild(createDiv);

	if(Alliansen === true) {
		createDiv.style.borderColor = "#EC922B";
	} else {
		createDiv.style.borderColor = "#2dd2d2";
	}
}
function lookForNewUpgrade(i)
{
  if (votes >= upgrades[i].cost/3 && upgrades[i].unlocked === false)
  {
    unlockUpgrade(i);
    upgrades[i].unlock();
  }
}

//spawn coins

var positionsY = [0, 50, 100, 150, 200, 450, 500, 550, 600, 650];	//All possible x & y coordinates
var positionsX = [0, 50, 100, 150, 200, 250, 300];

var container = document.getElementById("landingArea");
var counter = document.getElementById("counter");
var coinID = 0;
var coinCounter = 0;

function spawnCoin() {
	var isToken = false; //This is a coin
	coin = document.createElement("div");	//Create coin, give it class and put it in container
	coin.className = "coin";
	coin.setAttribute("id", coinID);
	container.appendChild(coin);
	coinID++; //Next coin spawned will have a higher ID

	var whatCoin = coin.id
	var coinDOM = document.getElementById(whatCoin); //Retrieves ID from coins and puts them in coinDOM
	coinDOM.addEventListener("mouseover", function() { //Adds a mouseover event listener to pick up coins
		var trash = container.removeChild(coinDOM);	//Remove coin
		++statistics.totalCoins; //Increase coin counter
		randomMoney(coinValue); //Retrives the value of the coin
		clearTimeout(preventRemove); //Prevents the coin from deleting again after some time if you pick it up
	} );

	var preventRemove = setTimeout(removeCoin, 20000, coinDOM); //Timer for coin to disapear
	generatePosition(isToken);
}


function generatePosition(isToken) {
	var arrX = Math.floor(Math.random()*positionsX.length);	//Pick a random coordinate from the arrays
	var arrY = Math.floor(Math.random()*positionsY.length);

	var xPos = positionsX[arrX];	//These positions are where the coin will end up
	var yPos = positionsY[arrY];

	if (isToken == true) { //If it is a token
		showLegendToken(xPos, yPos); //Run function to show token
	} else { //If it is a coin
		moveCoin(xPos, yPos); //Run function to animate coin movement
	}
}

function moveCoin(xPos, yPos) {
	var x = 200;	//Coin start coordinates
	var y = 350;

 	var moveAnimation = setInterval(frame, 1);	//Call the function frame every 1ms
 	function frame() {

	    if (x == xPos && y == yPos) {	//When both x & y position are met, stop the animation
	      	clearInterval(moveAnimation);

	    } else if (xPos == 200 && yPos == 350) {	//If x & y is going to the starting coordinates, generate new ones
				isToken = false;
				generatePosition(isToken);
	    } else {

				if (x == xPos) { //The x axis
					x = xPos; //When x meet its position stop increasing x value
				} else {
					if (xPos == 0) { //Coin moves different amounts depending on what coordinate it got
							x = x - 4;
						} else if (xPos == 50) {
							x = x - 3;
						} else if (xPos == 100) {
							x = x - 2;
						} else if (xPos == 150) {
							x--;
						} else if (xPos == 250) {
							x++;
						} else if (xPos == 300) {
							x = x + 2;
						}
				}

			if (y == yPos) { //The y axix, works the same way
				y = yPos;
			} else {
				if (yPos == 0) {
	    			y = y - 7;
		    	} else if (yPos == 50) {
		    		y = y - 6;
		    	} else if (yPos == 100) {
		    		y = y - 5;
		    	} else if (yPos == 150) {
		    		y = y - 4;
		    	} else if (yPos == 200) {
		    		y = y - 3;
					} else if (yPos == 450) {
		    		y = y + 2;
		    	} else if (yPos == 500) {
		    		y = y + 3;
		    	} else if (yPos == 550) {
		    		y = y + 4;
		    	} else if (yPos == 600) {
		    		y = y + 5;
		    	} else if (yPos == 650) {
		    		y = y + 6;
		    	}
			}

			var whatCoin = coin.id;
			var coinDOM = document.getElementById(whatCoin); //Get the moving coins ID
			coinDOM.style.top = y + 'px'; //Style top and left every frame to create movement
			coinDOM.style.left = x + 'px';
			}
  	}
}

function removeCoin(coinDOM) {
		var trash = container.removeChild(coinDOM); //Removes coin
}

function reasonableCoinSpawn() //Prevents too many coins spawning at once
{
		if (coinRng >= coinRngSetting && recentCoinSpawn === false)
		{
			spawnCoin();
			recentCoinSpawn = true;
			setTimeout(setRecentSpawnFalse, 350);
		}
		return;
	}
function setRecentSpawnFalse() //If called, a coin has not spawned recently
{
		recentCoinSpawn = false;
	}
function randomMoney(coinValue) //RNG Logic to coins to give them different values
{
		var rollOne = Math.floor(Math.random()*11);
		var rollTwo = Math.floor(Math.random()*11);
		var coinAmountTemp = 0;

		if (rollOne >= 7)
		{
			coinAmountTemp = (Math.random()*7+3) * coinValue;
			coinAmount += coinAmountTemp;
		}
		else
		{
			coinAmountTemp = (Math.random()*2+1) * coinValue;
			coinAmount += coinAmountTemp;
		}
		statistics.totalMoney += coinAmountTemp;
	}

var randomSpawn = Math.floor(Math.random() * 300000) + 180000;
var tokenTimer = setInterval(spawnLegendToken, randomSpawn); //Tells a Legend Token to spawn every 3-5 mins

function spawnLegendToken() {
	var isToken = true; //This is a token
	token = document.createElement("div");
	token.setAttribute("id", "legendToken");
	container.appendChild(token);

	token.addEventListener("mouseover", function() { //Event listener to pick up token
		var trash = container.removeChild(token);
		++tokenAmount;
		++statistics.totalLegendTokens;
		clearTimeout(preventDelete); //Prevents token from being deleted after a while since it is already picked up
	});

	randomSpawn = Math.floor(Math.random() * 300000) + 180000; //New time for token to spawn
	preventDelete = setTimeout(blinkToken, 30000);
	generatePosition(isToken);
}

function showLegendToken(xPos, yPos) { //Puts the token where it should be
	token.style.top = yPos + 'px';
	token.style.left = xPos + 'px';
}

function blinkToken() { //Token starts blinking before it disapears
	token.setAttribute("id", "legendToken2");
	preventDelete = setTimeout(removeToken, 10000);
}

function removeToken() {
	var trash = container.removeChild(token); //Remove token
}

/*//Stats//*/

 statistics = { //Tracks a range of different stats
	 totalVotes: 0, //done
	 totalMoney: 0, //done
	 totalClicks: 0, //done
	 totalCoins: 0, //done
	 totalLegendTokens: 0, //done
	 votesPerClick: 0, //done
	 votesPerSecond: 0, //done
	 timePlayed: 0,
	 charactersOwned: 0,
	 moneyValue: 0,
	 votesPerSecondMultiplier: 0,
	 getValues: function() {
		 this.votesPerClick = click.votesPerClick;
		 this.votesPerSecond = vps.votesPerSec;
		 this.votesPerSecondMultiplier;
	 }
};

/*/Objekt
----------------
--------------/*/
var teamBlue = //Array med Alliansens karaktärer (som objekt)
[
  Ebba =
  {
    name: "Ebba Busch Thor",
		party: "KD",
    quantity: 0,
    cost: 25,
    vps: 1,
    accumvps: 0,
    lockedImage: "url('./img-alliansen/ebba-locked.png')",
    image: "url('./img-alliansen/ebba.png')",
    unlocked: false,
    unlock: function() {
      this.unlocked = true;
      return;
    },
    load: function() {
      if (votes >= this.cost) {
        votes-=this.cost;
        this.quantity++;
        vps.vpsValue += this.vps;
        this.cost = Math.ceil(this.cost*1.10)
        this.accumvps += this.vps; //Accumulated votes per sec for this char
        document.getElementById("cost " + this.name).innerHTML =  "kostnad: " + this.cost + " R";
        document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
        document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/ebba-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
    },
		info: '"Skillnaden mellan att kapa och skapa vårdköer är ett (S)."',
  },
	Jan =
	{
		name: "Jan Björklund",
		party: "L",
    quantity: 0,
    cost: 175,
    vps: 10,
    accumvps: 0,
    lockedImage: "url('./img-alliansen/jan-locked.png')",
    image: "url('./img-alliansen/jan.png')",
    unlocked: false,
    unlock: function() {
      this.unlocked = true;
      return;
    },
    load: function() {
      if (votes >= this.cost) {
        votes-=this.cost;
        this.quantity++;
        vps.vpsValue += this.vps;
        this.cost = Math.ceil(this.cost*1.10)
        this.accumvps += this.vps; //Accumulated votes per sec for this char
        document.getElementById("cost " + this.name).innerHTML = "kostnad: " +  this.cost + " R";
        document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
        document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/jan-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
    },
		info: '"Rysk gas har två nackdelar. Den ena är att den är gas, och den andra är att den är rysk."',
	},
	Annie =
	{
		name: "Annie Lööf",
		party: "C",
		quantity: 0,
		cost: 850,
		vps: 60,
		accumvps: 0,
		lockedImage: "url('./img-alliansen/annie-locked.png')",
		image: "url('./img-alliansen/annie.png')",
		unlocked: false,
		unlock: function() {
			this.unlocked = true;
			return;
		},
		load: function() {
			if (votes >= this.cost) {
				votes-=this.cost;
				this.quantity++;
				vps.vpsValue += this.vps;
				this.cost = Math.ceil(this.cost*1.10)
				this.accumvps += this.vps; //Accumulated votes per sec for this char
				document.getElementById("cost " + this.name).innerHTML = "kostnad: " +  this.cost + " R";
				document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
				document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/annie-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
		},
		info: '"Det finns tre saker som jag tycker riktigt illa om: 1) socialism 2) arrogans 3) män som inte förstår ett nej."',
	},
	Ulf =
	{
		name: "Ulf Kristersson",
		party: "M",
		quantity: 0,
		cost: 2500,
		vps: 150,
		accumvps: 0,
		lockedImage: "url('./img-alliansen/ulf-locked.png')",
		image: "url('./img-alliansen/ulf.png')",
		unlocked: false,
		unlock: function() {
			this.unlocked = true;
			return;
		},
		load: function() {
			if (votes >= this.cost) {
				votes-=this.cost;
				this.quantity++;
				vps.vpsValue += this.vps;
				this.cost = Math.ceil(this.cost*1.10)
				this.accumvps += this.vps; //Accumulated votes per sec for this char
				document.getElementById("cost " + this.name).innerHTML = "kostnad: " +  this.cost + " R";
				document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
				document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/ulf-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
		},
		info: '"Det politiska samtalsklimatet plågas av gnällighet, ängslighet och stingslighet. Nu behövs några vuxna i rummet."',
	},
];
var teamRed = //Array med Rödgrönas karaktärer (som objekt)
[
	Jonas =
  {
    name: "Jonas Sjöstedt",
		party: "V",
    quantity: 0,
    cost: 25,
    vps: 1,
    accumvps: 0,
    lockedImage: "url('./img-rodgron/jonas-locked.png')",
    image: "url('./img-rodgron/jonas.png')",
    unlocked: false,
    unlock: function() {
      this.unlocked = true;
      return;
    },
    load: function() {
      if (votes >= this.cost) {
        votes-=this.cost;
        this.quantity++;
        vps.vpsValue += this.vps;
        this.cost = Math.ceil(this.cost*1.10)
        this.accumvps += this.vps; //Accumulated votes per sec for this char
        document.getElementById("cost " + this.name).innerHTML =  "kostnad: " +  this.cost + "R ";
        document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
        document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/jonas-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
    },
		info: '"När jag hör Jimmie Åkesson prata om miljöfrågan, börjar jag tänka på ett sånt här flaskskepp, hur kom du in hit egentligen?"',
  },
	Gustav =
	{
		name: "Gustav Fridolin",
		party: "MP",
    quantity: 0,
    cost: 175,
    vps: 10,
    accumvps: 0,
    lockedImage: "url('./img-rodgron/gustav-locked.png')",
    image: "url('./img-rodgron/gustav.png')",
    unlocked: false,
    unlock: function() {
      this.unlocked = true;
      return;
    },
    load: function() {
      if (votes >= this.cost) {
        votes-=this.cost;
        this.quantity++;
        vps.vpsValue += this.vps;
        this.cost = Math.ceil(this.cost*1.10)
        this.accumvps += this.vps; //Accumulated votes per sec for this char
        document.getElementById("cost " + this.name).innerHTML = "kostnad: " + this.cost + " R";
        document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
        document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/gustav-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
    },
		info: '"Det här är en kolbit."',
	},
	Isabella =
	{
		name: "Isabella Lövin",
		party: "MP",
		quantity: 0,
		cost: 850,
		vps: 60,
		accumvps: 0,
		lockedImage: "url('./img-rodgron/isabella-locked.png')",
		image: "url('./img-rodgron/isabella.png')",
		unlocked: false,
		unlock: function() {
			this.unlocked = true;
			return;
		},
		load: function() {
			if (votes >= this.cost) {
				votes-=this.cost;
				this.quantity++;
				vps.vpsValue += this.vps;
				this.cost = Math.ceil(this.cost*1.10)
				this.accumvps += this.vps; //Accumulated votes per sec for this char
				document.getElementById("cost " + this.name).innerHTML =  "kostnad: " + this.cost + " R";
				document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
				document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/isabella-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
		},
		info: '"Det finns inga jobb på en död planet."',
	},
	Stefan =
	{
		name: "Stefan Löfvén",
		party: "S",
		quantity: 0,
		cost: 2500,
		vps: 150,
		accumvps: 0,
		lockedImage: "url('./img-rodgron/stefan-locked.png')",
		image: "url('./img-rodgron/stefan.png')",
		unlocked: false,
		unlock: function() {
			this.unlocked = true;
			return;
		},
		load: function() {
			if (votes >= this.cost) {
				votes-=this.cost;
				this.quantity++;
				vps.vpsValue += this.vps;
				this.cost = Math.ceil(this.cost*1.10)
				this.accumvps += this.vps; //Accumulated votes per sec for this char
				document.getElementById("cost " + this.name).innerHTML =  "kostnad: " + this.cost + " R";
				document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
				document.getElementById("vps " + this.name).innerHTML = "Varje " + this.name + " ger " + this.vps + " röster per sekund. Totalt " + this.accumvps + " röster per sekund.";
				//visa att en är köpt i lineup i midsection
				var pps = document.createElement("span");
				pps.style.backgroundImage = "url('./img-misc/mini/stefan-s.png')"
				pps.classList.add("lineUpPps");
				document.getElementById("lineup").appendChild(pps);
			}
		},
		info: '"Men, eh... det är bara käbbel!"',
	},
];

var legendaryHero = //Array med SECRET HEROES OMFG (som objekt)
[

];

var quest = [
	Jimmie = {
		name: "Jimmie Åkesson",
		party: "SD",
		quantity: 0,
		cost: 0,
		vps: 0,
		accumvps: 0,
		image: "url('./img-rodgron/stefan.png')",
		load: function() {
			if (this.quantity == 0) {

			} else {
				if (votes >= this.cost) {
					votes-=this.cost;
					this.quantity++;
					++statistics.charactersOwned;
					vpsValue += this.vps;
					this.cost = Math.ceil(this.cost*1.10)
					this.accumvps += this.vps; //Accumulated votes per sec for this char
					document.getElementById("cost " + this.name).innerHTML = "kostnad: " + this.cost + "R";
					document.getElementById("name " + this.name).innerHTML = this.quantity + " x " + this.name;
					document.getElementById("vps " + this.name).innerHTML = "Röster/s: " + this.accumvps;
				}
			}
		},
		info: '"Tjena bloggen, Jimmie här!"',
		quest: function() {
			var questBox = document.createElement("div");
			questBox.setAttribute("id", "questBox");
			var questText = document.createElement("p");
			var questTextNode = document.createTextNode("Tjena du, vill du sammarbeta?");
			var yesButton = document.createElement("button");
			var buttonNode = document.createTextNode("Yes");
			var noButton = document.createElement("button");
			var buttonNode2 = document.createTextNode("No");

			questText.appendChild(questTextNode);
			questBox.appendChild(questText);
			yesButton.appendChild(buttonNode);

			noButton.appendChild(buttonNode2);
			questBox.appendChild(yesButton);
			questBox.appendChild(noButton);
			gameBoard.appendChild(questBox);
			yesButton.addEventListener("mousedown", this.questStart());
		},
		questStart: function() {
			alert();
			gameBoard.removeChild(questBox);
			this.load();

		}
	}
];

var upgrades = //Array med spelets alla uppgraderingar (som objekt)
[
  ImprovedClicks = //upgrades[0]
  {
    name: "Förbättrade Klickningar",
    description: "Klickningar ger fler röster (+2% av din totala röster/s)",
    cost: 350,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        click.vpsRatio += 0.02;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
  },
	ImprovedClicks2 = //upgrades[1]
	{
		name: "Brinnande fingrar",
    description: "Klickningar ger fler röster (+2% av din totala röster/s)",
    cost: 12500,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
				this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        click.vpsRatio += 0.02;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
	},
	ImprovedClicks3 = //upgrades[2]
	{
		name: "Krampande fingrar",
    description: "Klickningar ger fler röster (+2% av din totala röster/s)",
    cost: 85000,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        click.vpsRatio += 0.02;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
	},
	ClickBonusPerChar =
	{
		name: "Kvantitet > Kvalitet",
    description: "Varje klick genererar 1 extra röst för varje ägda karaktär",
    cost: 250,
		valuta: "SEK",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (coinAmount >= this.cost)
      {
        coinAmount -= this.cost;
				click.bonusPerChar = true;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
	},
  RosterGalore1 =
  {
    name: "Röster Galore",
    description: "Ökar dina röster/s med 20%!",
    cost: 1000,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        vps.vpsMultiplier*=1.20;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
  },
	RosterGalore2 =
  {
    name: "Röster GALORE!",
    description: "Ökar dina röster/s med 35%!",
    cost: 5000,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        vps.vpsMultiplier*=1.35;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
  },
	RosterGalore3 =
  {
    name: "RÖSTER GALORE!!",
    description: "Ökar dina röster/s med 50%!",
    cost: 500000,
		valuta: "R",
    //image:
    unlocked: false,
    unlock: function()
    {
      this.unlocked = true;
    },
    load: function()
    {
      if (votes >= this.cost)
      {
        votes -= this.cost;
        vps.vpsMultiplier*=1.50;
        document.getElementById("uppgr").removeChild(document.getElementById(this.name));
      }
    }
  },
	StarkKrona1 =
	{
		name: "Stark Krona",
		description: "Värdet på mynt dubbleras",
		cost: 1500,
		valuta: "SEK",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (coinAmount >= this.cost)
			{
				coinAmount -= this.cost;
				coinValue *= 2;
				document.getElementById("uppgr").removeChild(document.getElementById(this.name));
			}
		}
	},
	StarkKrona2 =
	{
		name: "Starkare Krona",
		description: "Värdet på mynt dubbleras, igen!",
		cost: 3000,
		valuta: "SEK",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (coinAmount >= this.cost)
			{
				coinAmount -= this.cost;
				coinValue *= 2;
				document.getElementById("uppgr").removeChild(document.getElementById(this.name));
			}
		}
	},
	StarkKrona3 =
	{
		name: "Krona på Steroider",
		description: "Värdet på mynt dubbleras, ytterligare en gång!",
		cost: 8500,
		valuta: "SEK",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (coinAmount >= this.cost)
			{
				coinAmount -= this.cost;
				coinValue *= 2;
				document.getElementById("uppgr").removeChild(document.getElementById(this.name));
			}
		}
	},
	Inflation =
	{
		name: "Inflation",
		description: "Ökar chansen att få ett mynt.",
		cost: 1500,
		valuta: "R",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (votes >= this.cost)
			{
				votes -= this.cost;
				coinRngSetting-=2;
				document.getElementById("uppgr").removeChild(document.getElementById(this.name));
			}
		}
	},
	Inflation2 =
	{
		name: "Hyperinflation",
		description: "Ökar chansen att få ett mynt.",
		cost: 15000,
		valuta: "R",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (votes >= this.cost)
			{
				votes -= this.cost;
				coinRngSetting-=2;
				document.getElementById("uppgr").removeChild(document.getElementById(this.name));
			}
		}
	},
	Loneforminskning =
	{
		name: "Löneförminskning",
		description: "Alla politiker kostar nu 33% mindre.",
		cost: 150000,
		valuta: "R",
		//image:
		unlocked: false,
		unlock: function()
    {
      this.unlocked = true;
		},
		load: function()
		{
			if (votes >= this.cost)
			{
				votes -= this.cost;
				for (var i = 0; i < char.length; i++)
				{
					char[i].cost *= 0.67;
					document.getElementById("cost " + char[i].name).innerHTML = "Kostnad: " + char[i].cost;
					document.getElementById("uppgr").removeChild(document.getElementById(this.name));
				}
			}
		}
	},
];

//BOT SECTION
var botVotes = 0;
var flatValue = 2;
var incrValue = 0;
var adaptLogic = 1;
var botVpsMultiplier = 1;
var botVps = botVpsMultiplier*(flatValue + incrValue) * adaptLogic;

var botVotesHTML = document.getElementById("botvotes");


function botIncrement()
{
	botVps = botVpsMultiplier*(flatValue + incrValue) * adaptLogic;
	botVotes += botVps;
	botIncrValue();
	adaptLogics();
	botUpgrades();
	botVotesHTML.innerHTML = botVotes.toFixed(0);


}
setInterval(botIncrement, 1000);

function botIncrValue()
{
	bonusRng = Math.random()*0.10;
	incrValue++;
	botVotes += incrValue * bonusRng;
}


function adaptLogics()
{
 	playerRelation = (votes+1)/(botVotes+1);
	adaptLogic = playerRelation;
}

function botUpgrades()
{
	var rollDice = Math.floor(Math.random()*300);
	if (rollDice >= 260)
	{
		botVotes *= 0.75;
		botVpsMultiplier += 0.25;
	}
	else if (rollDice === 3)
	{
		botVotes *= 0.50;
		botVpsMultiplier += 0.75;
	}
}


/*/TALENT TREE/*/
var talentTree =
{
	budget: 0,
	costBudget: 50,
	nameBudget: "Budgetplanering",
	descrBudget: "Ökar chansen att få ett mynt och deras värde med 5%",

	marketing: 0,
	costMarketing: 50,
	nameMarketing: "Marknadsföring",
	descrMarketing: "Ökar dina röster per sekund med 2.5%",

	retorik: 0,
	costRetorik: 50,
	nameRetorik: "Retorik",
	descrRetorik: "Ökar dina röster per klick med 15%",

	budgetSpec: function()
	{
		if (coinAmount >= this.costBudget)
		{
			coinAmount -= this.costBudget;
			this.budget++;
			this.costBudget *= 1.05;
			//effekt
			coinValue++;
			coinRngSetting -= 0.25;
		}
	},
	marketingSpec: function()
	{
		if (coinAmount >= this.costMarketing)
		{
			coinAmount -= this.costMarketing;
			this.marketing++;
			this.costMarketing *= 1.05;
			//effekt
			vps.vpsMultiplier *= 1.025;
		}
	},
	retorikSpec: function()
	{
		if (coinAmount >= this.costRetorik)
		{
			coinAmount -= this.costRetorik;
			this.retorik++;
			this.costRetorik *= 1.05;
			//effekt
			click.talentClickMultiplier *= 1.15;
		}
	}
};
//function som håller specsen uppdaterade - placeras i gameloop för att uppdateras kontinuerligt
function refreshSpecs() {
	amtBudget.innerText = talentTree.budget;
	amtMarketing.innerText = talentTree.marketing;
	amtRetorik.innerText = talentTree.retorik;
	buyBudget.innerText = talentTree.costBudget.toFixed(2) + "SEK";
	buyMarketing.innerText = talentTree.costMarketing.toFixed(2) + "SEK";
	buyRetorik.innerText = talentTree.costRetorik.toFixed(2) + "SEK";
}
//spans för att uppdatera mängden av specs
var amtBudget = document.getElementById("amtBudget");
var amtMarketing = document.getElementById("amtMarketing");
var amtRetorik = document.getElementById("amtRetorik");
//referenser till köpknapp för specs
var buyBudget = document.getElementById("buyBudget");
buyBudget.addEventListener("click", talentTree.budgetSpec());
var buyMarketing = document.getElementById("buyMarketing");
buyMarketing.addEventListener("click", talentTree.marketingSpec());
var buyRetorik = document.getElementById("buyRetorik");
buyRetorik.addEventListener("click", talentTree.retorikSpec());
/*/END GAME OBJECT/*/
var endGame =
{
	majoritet: 3500000,
	speltid: 0,
	spelarnamn: "",

	database: firebase.database().ref("Highscores"),

	timeStart: function() //Startar klockan
	{
		startTime = new Date();
		return startTime;
	},
	timeEnd: function() //Stannar klockan och kalkylerar speltid
	{
		var endTime = new Date() - startTime;
		this.speltid = (endTime/60000).toFixed(2);
		return endTime;
	},
	check: function() //Kollar efter vinst
	{
		if (votes > this.majoritet)
		{
			this.timeEnd();
			this.winframe();
			clearInterval(loopInterval);
		}
	},
	winframe: function() //Skapar gratulationsruta + name/score submission
	{
		var windiv = document.createElement("div");
		windiv.setAttribute("id", "windiv");
		var p1 = document.createElement("p");
		var p2 = document.createElement("p");
		var p3 = document.createElement("p");
		p1.setAttribute("id", "wintitle");
		p1.innerText = "Du har vunnit!";
		p2.setAttribute("id", "winsubtitle");
		p2.innerText = "Du nådde majoritet efter:";
		p3.setAttribute("id", "wintime");
		p3.innerText = this.speltid + " minuter";
		windiv.appendChild(p1);
		windiv.appendChild(p2);
		windiv.appendChild(p3);
		var form = document.createElement("form");
	  form.setAttribute("id", "winform");
		var input1 = document.createElement("input");
		var input2 = document.createElement("input");
		form.appendChild(input1);
		form.appendChild(input2);
		windiv.appendChild(form);
		document.getElementsByTagName("body")[0].appendChild(windiv);
		input1.setAttribute("type", "text");
		input1.setAttribute("id", "highscorename");
		input2.setAttribute("type", "button");
		input2.setAttribute("id", "highscorebutton");
	  input2.setAttribute("value", "Submit");
	  var submitbutton = document.getElementById("highscorebutton");
	  submitbutton.onclick = function(){endGame.namesubmit();}
	},
	namesubmit: function() //funktion som binds till knappen i winframe()
	{
		var inputName = document.getElementById("highscorename").value;
	  this.spelarnamn = inputName;
		var obj =
		{
			Score: this.speltid,
			Name: this.spelarnamn,
		}
		this.database.push(obj);
		window.location.href = "hs.html";

	},
}

/*/CONVERT SEK TO TOKENS/*/

var tokenConvert =
{
	tokenCost: 2000,
	tokenDOM: document.getElementById("currentAmount"),
	one: function()
	{
		if (coinAmount >= this.tokenCost)
		{
			coinAmount -= this.tokenCost;
			tokenAmount++;
		}
	},
}
