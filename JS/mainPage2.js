	document.querySelector("#restart").addEventListener("click",()=>window.location.reload());
	
	//Audio files
	const mouse=new Audio("Sounds/mouse.mp3");
	const noMatch=new Audio("Sounds/wrong.mp3");
	const gameEnd=new Audio("Sounds/gameEnd.mp3");
	const matchFound=new Audio("Sounds/matchFound.mp3");
	
	
	let sfxCheck=document.querySelector("#rb2");
	const gameSound=document.querySelector("#gameSound");
	let count=1;
	
	//Level 2 game cards
	let cardList=[
		{
			name:"Ant",
			source:"Images/Edited/ant.jpg"
		},
		{
			name:"Ant",
			source:"Images/Edited/ant.jpg"
		},
		{
			name:"Bee",
			source:"Images/Edited/bee.jpg"
		},
		{
			name:"Bee",
			source:"Images/Edited/bee.jpg"
		},
		{
			name:"Bunny",
			source:"Images/Edited/bunny.jpg"
		},
		{
			name:"Bunny",
			source:"Images/Edited/bunny.jpg"
		},
		{
			name:"Butterfly",
			source:"Images/Edited/butterfly.jpg"
		},
		{
			name:"Butterfly",
			source:"Images/Edited/butterfly.jpg"
		},
		{
			name:"Cat",
			source:"Images/Edited/cat.jpg"
		},
		{
			name:"Cat",
			source:"Images/Edited/cat.jpg"
		},
		{
			name:"Cockroach",
			source:"Images/Edited/cockroach.jpg"
		},
		{
			name:"Cockroach",
			source:"Images/Edited/cockroach.jpg"
		},
		{
			name:"Cow",
			source:"Images/Edited/cow.jpg"
		},
		{
			name:"Cow",
			source:"Images/Edited/cow.jpg"
		},
		{
			name:"Crab",
			source:"Images/Edited/crab.jpg"
		},
		{
			name:"Crab",
			source:"Images/Edited/crab.jpg"
		},
		{
			name:"Crocodile",
			source:"Images/Edited/crocodile.jpg"
		},
		{
			name:"Crocodile",
			source:"Images/Edited/crocodile.jpg"
		},
		{
			name:"Dog",
			source:"Images/Edited/dog.jpg"
		},
		{
			name:"Dog",
			source:"Images/Edited/dog.jpg"
		},
		{
			name:"Donkey",
			source:"Images/Edited/donkey.jpg"
		},
		{
			name:"Donkey",
			source:"Images/Edited/donkey.jpg"
		},
		{
			name:"Eagle",
			source:"Images/Edited/eagle.jpg"
		},
		{
			name:"Eagle",
			source:"Images/Edited/eagle.jpg"
		},
		{	
			name:"Elephant",
			source:"Images/Edited/elephant.jpg"
		},
		{
			name:"Elephant",
			source:"Images/Edited/elephant.jpg"
		},
		{
			name:"Fish",
			source:"Images/Edited/fish.jpg"
		},
		{
			name:"Fish",
			source:"Images/Edited/fish.jpg"
		},
		{
			name:"Giraffee",
			source:"Images/Edited/giraffee.jpg"
		},
		{
			name:"Giraffee",
			source:"Images/Edited/giraffee.jpg"
		}
	];

	//Checklist
	let checkList=[];
	for(let i=0;i<=30;i++){
		const temp={i:{clicked:false}};
		checkList.push(temp);
	}

	cardList.sort(()=> 0.5-Math.random());
	
	let gameBoard=document.querySelector("#gameBoard");
	let cardId=[];
	let cardNames=[];
	let score=0;
	let errors=0;
	
	for(let i=0;i<cardList.length;i++){
		let img = document.createElement("img");
		img.setAttribute("src","Images/leaf2.jpg");
		img.setAttribute("data-id",i);
		gameBoard.appendChild(img);
		img.style.height="80px";
		img.style.width="80px";
		img.addEventListener("click",flipCard);
	}

	//Method to flip the card
	function flipCard(){
		var singleCardId=this.getAttribute("data-id");
		if(checkList[singleCardId].i.clicked===false){
			if(sfxCheck.checked===true){
				mouse.play();
			}
			checkList[singleCardId].i.clicked=true;
			this.setAttribute("src",cardList[singleCardId].source);
			cardId.push(singleCardId);
			cardNames.push(cardList[singleCardId].name);
			if(cardNames.length===2){
				setTimeout(matchCheck,500);
			}
		}
	}

	//MatchCheck
	function matchCheck(){
		let allBoxes=document.querySelectorAll("img");
		let option1=cardNames[0];
		let option2=cardNames[1];
		if(option1===option2){
			if(sfxCheck.checked===true){
				matchFound.play();
			}
			allBoxes[cardId[0]].setAttribute("src","Images/Edited/blank1.png");
			allBoxes[cardId[1]].setAttribute("src","Images/Edited/blank1.png");
			checkList[cardId[0]].i.clicked=true;
			checkList[cardId[1]].i.clicked=true;
			score++;
			scoreDisplay();
		}
		else{
			if(sfxCheck.checked===true){
				noMatch.play();
			}
			allBoxes[cardId[0]].setAttribute("src","Images/leaf2.jpg");
			allBoxes[cardId[1]].setAttribute("src","Images/leaf2.jpg");
			checkList[cardId[0]].i.clicked=false;
			checkList[cardId[1]].i.clicked=false;
			errors++;
		}
		cardId=[];
		cardNames=[];
	}

	//Method to display score
	function scoreDisplay(){
		if(score<15){
			document.querySelector("#score").textContent=score;
			document.querySelector("#score2").textContent=score;
		}
		else{
			document.querySelector("#score").textContent="Level Unlocked";
			document.querySelector("#score2").textContent="Level Unlocked";
			gameSound.pause();
			if(sfxCheck.checked===true){
				gameEnd.play();
			}
			document.querySelector(".nextLevel").style.visibility="visible";
			document.querySelector(".seeYourStats").style.visibility="visible";
			document.querySelector("#seeYourStats2").style.visibility="visible";
			document.querySelector("#nxtLvlBtn").style.visibility="visible";
			document.querySelector(".seeYourStats").addEventListener("click",statsDisplay);
			document.querySelector("#seeYourStats2").addEventListener("click",statsDisplay);
		}
	}
	
	//Method to play music
	function playMusic(){
		if(count===0){
			document.querySelector("#onOffButton").textContent="Turn on";
			gameSound.pause();
			count=1;
		}
		else if(count===1){
			document.querySelector("#onOffButton").textContent="Turn off";
			gameSound.play();
			count=0;
		}
	}

	//Method to display stats
	function statsDisplay(){
		alert("You have made a total of " +  errors + " Errors.");
		if(errors<=10){
			alert("I must say, you have a pretty good memory");
		}
		else if(errors<=30){
			alert("You are normal in your memory, with practise you can improve");
		}
		else{
			alert("Damn focus the next time you turn your card !");
		}
	}