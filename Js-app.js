
let Round = 1;
let cScrCount = 0;
let pScrCount = 0;
let playerclick = true;
let pickselect = null;
let playerAvatar = null;

const plyBkground = document.getElementById("playbackground");
const popplayNowCover = document.getElementById("playNowcover");
const popplayagainCover = document.getElementById("playagaincover");
const pwinrimg = document.getElementById("playwinrimg");
const winerName = document.getElementById("plyrwinsname");
const rpTotalscor = document.getElementById("pTotalscor");
const rcpTotalscor = document.getElementById("cTotalscor");
const playAgnbutton = document.getElementById("playAgnbutton");
const homBttn = document.getElementById("homebutton");
const pChoice = document.querySelectorAll(".choice");
const cChoice = document.querySelectorAll(".c-choice");
const msg = document.getElementById("msg");
const roundCount = document.getElementById("round");
const cScoreCount = document.getElementById("comp-score");
const pScoreCount = document.getElementById("user-score");
const cScore = document.querySelectorAll(".c-scr");
const pScore = document.querySelectorAll(".p-scr");
const mpplayAgnbutton = document.getElementById("restartbox");
const spickrbtn = document.getElementById("spcrbtn");
const bgaudio = document.getElementById("bg-audio"); 
bgaudio.volume = .1;                                  
const soundIcon = document.getElementById("sound-icon");
const clickSound = document.getElementById("click-sound");
const resultSound = document.getElementById("result-soundTo");
const btn = document.getElementById("chbox");
const gzone = document.getElementById("game-zone");
const notification = document.getElementById("notify");
const chngtxt = document.querySelectorAll(".ctxt");





document.addEventListener("DOMContentLoaded",function(){  /*--✅--*/

 
 const pNmInput = document.getElementById("plrNmInput");
 const pName = document.getElementById("player-Name");
 const pImgInput = document.querySelectorAll(".plrImgInput");
 const pImg = document.getElementById("player-img");
 const plyBttn = document.getElementById("playbutton");
 const plyArea = document.getElementById("game-area");
  


  spickrbtn.checked = false; 
  bgaudio.pause();
  soundIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  spickrbtn.addEventListener("change", function () {
    if (spickrbtn.checked) {
      bgaudio.play().catch(function (err) {
      console.log("auto play error:" + err);
    });
      soundIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
      bgaudio.pause();
      soundIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
  });

  pImgInput.forEach(function(imgpick){
    imgpick.addEventListener("click",function(){
      pImgInput.forEach(function(pic){
        pic.classList.remove("selected");
      });
      imgpick.classList.add("selected");
      pickselect = imgpick.getAttribute("data-pic");
    });
  });

  plyBttn.addEventListener("click", function(){
   const pInputNm =  pNmInput.value.trim();
    if(pInputNm === ""){
      alert("Please enter a code name.");
      return;
    }else if(pInputNm.length >5){
      alert("Keep code name under 5 characters.");
      return;
    }else if(!pickselect){
      alert("Please select your avatar.")
      return;
    }else{
      pName.textContent = "..."+pInputNm;
      pImg.style.backgroundImage = `url("${pickselect}")`;
      playerAvatar = pickselect;
    }
    

    if(spickrbtn.checked){
    bgaudio.play().catch(function(err){
      console.log ("auto play error;" +err);
    });
   }


   plyBkground.style.display = "none";
   plyArea.style.filter = "none";
   plyArea.style.pointerEvents = "auto";
  });


 /*local storage*/

 const savedGame = JSON.parse(localStorage.getItem("gameState"));

if (savedGame) {
  document.getElementById("player-Name").textContent = savedGame.pName;
  document.getElementById("player-img").style.backgroundImage = savedGame.pImg;
  
  Round = savedGame.roundCount;
   roundCount.textContent = "Round:" + Round; 
  cScrCount = savedGame.cScrCount;
  pScrCount = savedGame.pScrCount;

  spickrbtn.checked = savedGame.soundEnabled;
  if (spickrbtn.checked) {
    bgaudio.play().catch(err => console.log("autoplay error:", err));
    soundIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    bgaudio.pause();
    soundIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }

  pScoreCount.innerHTML = savedGame.pScoreText;
  cScoreCount.innerHTML = savedGame.cScoreText;
  msg.innerHTML = savedGame.msgText;

  savedGame.pScoreColors.forEach((color, index) => {
    pScore[index].style.backgroundColor = color;
  });
  savedGame.cScoreColors.forEach((color, index) => {
    cScore[index].style.backgroundColor = color;
  });

  // Restore Theme
  btn.checked = savedGame.themeChecked;
  gzone.style.backgroundImage = savedGame.gzoneBg;

  chngtxt.forEach(chan => {
    if (btn.checked) {
      chan.style.textShadow = ".5px .5px 3px rgba(0, 0, 0, 1)";
    } else {
      chan.style.removeProperty("text-shadow");
    }
  });

  const plyArea = document.getElementById("game-area");
  plyArea.style.filter = "none";
  plyArea.style.pointerEvents = "auto";
  plyBkground.style.display = "none";
}


});



pChoice.forEach(function(pClick){
pClick.addEventListener("click", function(){
  if(!playerclick){return;}
  playerclick = false;
  disableplayerclick();

  clickSound.currentTime = 0;  
  clickSound.play(); 

const pSelect = pClick.getAttribute("data-choos");
const pGlow = document.getElementById(`p-${pSelect}`);
    pGlow.style.border = "4px solid yellow";
    setTimeout(() => {
      pGlow.style.border = "";
    }, 1100);
  
compChoice(pSelect);

  setTimeout(() => {
    if (Round<=15){
    playerclick = true;
    enableplayerclick();
    }
  },1300);
});
});

function compChoice(pSelect){
  const cClick = ["rock", "paper", "scissor"];
  const cRandom = Math.floor(Math.random()*3);
  const cSelect = cClick[cRandom];
  const cGlow = document.getElementById(cSelect);
  cGlow.style.border = "4px solid yellow";
  setTimeout(() => {
    cGlow.style.border = "";
  },1100);

  console.log("p : " +pSelect);
  console.log("c : " +cSelect);


  if(pSelect === cSelect ){
   msg.innerHTML = "🙌 It's a Draw 🙌 <br> play again";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 1100); 
   console.log("draw");
   return;
  }else if((pSelect === "rock" && cSelect ==="scissor") || (pSelect === "paper" && cSelect ==="rock") || (pSelect === "scissor" && cSelect ==="paper") ){
   msg.innerHTML = "🎊 You - won 🎊 <br> Computer - loss";
   pScrCount++;
   pScoreCount.innerHTML= +pScrCount +" : <u>Score</u>";
   pScore[Round -1 ].style.backgroundColor = "green";
   cScore[Round -1 ].style.backgroundColor = "red";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 1100);
   console.log("you win");
  }else{
    msg.innerHTML = "😭 You - loss 😭 <br> Computer - won";
    cScrCount++;
    cScoreCount.innerHTML= "<u>Score</u> : " +cScrCount;
    pScore[Round -1 ].style.backgroundColor = "red";
    cScore[Round -1 ].style.backgroundColor = "green";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 1100);
    console.log("com win");
  } 
  
  Round++;
  if (Round<=15){
    setTimeout(() => {
      roundCount.textContent = "";
      setTimeout(() => {
        roundCount.textContent = "Round:" +Round;
      }, 200);
    }, 1100);
    
  
  }else{
      
      
    setTimeout(() => {
      roundCount.textContent = "Game Over";
      disableplayerclick();
      bgaudio.pause();  

      rcpTotalscor.textContent = "JARVIS : " +cScrCount;
      rpTotalscor.textContent = " YOU : " +pScrCount;

      if(pScrCount > cScrCount){
        pwinrimg.style.backgroundImage = `url(${playerAvatar})`;
        pwinrimg.style.display = "flex";
        winerName.textContent = "YOU WIN!"
        console.log("working");
        
      }else{
      pwinrimg.style.backgroundImage = "url('/images/1-1Computer_Anime.webp')";
      winerName.textContent = "Better luck next time"
      }
      

      resultSound.currentTime = 0;
      resultSound.play().catch(function (err) {
      console.log("auto play error:" + err);
    });

      popplayNowCover.style.display ="none";
      plyBkground.style.display ="flex";
      popplayagainCover.style.display ="flex";
         
    }, 1200);
   
  }
}



playAgnbutton.addEventListener("click", function () {
  plyBkground.style.display = "none";
  restartgame();
});

mpplayAgnbutton.addEventListener("click", function () {
  playAgnbutton.click();
});

homBttn.addEventListener("click",function(){
  popplayNowCover.style.display = "flex";
  popplayagainCover.style.display ="none";
  plyBkground.style.display = "flex";
  
  const plyArea = document.getElementById("game-area");
  plyArea.style.filter = "blur(3px)";
  plyArea.style.pointerEvents = "none";
  
  document.getElementById("plrNmInput").value ="";
  document.querySelectorAll(".plrImgInput").forEach(function(pic){
    pic.classList.remove("selected");
  });
  restartgame();
});



function restartgame(){
  localStorage.removeItem("gameState");

  Round = 1;
  cScrCount = 0;
  pScrCount = 0;
  playerclick = true;
  enableplayerclick();
   
  spickrbtn.checked = false;
  bgaudio.pause();
  soundIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  
  roundCount.textContent = "Round:" +Round;
  pScoreCount.innerHTML= +pScrCount +" : <u>Score</u>";
  cScoreCount.innerHTML= "<u>Score</u> : " +cScrCount;
  msg.innerHTML = "Click and Play<br>Rock -Paper - Scissor ";

  for(let i=0; i<15; i++){
   pScore[i].style.backgroundColor = "rgb(213, 212, 212,0.6)";
   cScore[i].style.backgroundColor = "rgb(213, 212, 212,0.6)"; 
  }
}

function disableplayerclick(){
  pChoice.forEach(function(tap){
    tap.style.pointerEvents = "none";
    tap.style.opacity = "0.4";
    tap.style.cursor = "default";
  });
    cChoice.forEach(function(tap){
    tap.style.pointerEvents = "none";
    tap.style.opacity = "0.4";
    tap.style.cursor = "default";
  });

}
function enableplayerclick(){
  pChoice.forEach(function(tap){
    tap.style.pointerEvents = "auto";
    tap.style.opacity = "1";
    tap.style.cursor = "pointer";
  });
    cChoice.forEach(function(tap){
    tap.style.pointerEvents = "auto";
    tap.style.opacity = "1";
    tap.style.cursor = "pointer";
    
  });
}


btn.addEventListener("change",function(){
 if(btn.checked){
 gzone.style.backgroundImage = "url(/images/1-d-game_background_Anime.webp)";
 notification.textContent = ("Light mode enble");
  
 chngtxt.forEach(function(chan){
    chan.style.textShadow = ".5px .5px 3px rgba(0, 0, 0, 1)";
  });


 }else {
 gzone.style.removeProperty("background-image");
 notification.textContent = ("Dark mode enble");
 
  chngtxt.forEach(function(chan){
    chan.style.removeProperty("text-Shadow");
  });

 }
 notification.classList.remove("hid");
 notification.classList.add("sho");

 setTimeout(() => {
    notification.classList.remove("sho");
  notification.classList.add("hid");
  }, 2000);
});

/*local storage */
window.addEventListener("beforeunload", function () {
  const gameData = {
    pName: document.getElementById("player-Name").textContent,
    pImg: document.getElementById("player-img").style.backgroundImage,
    roundCount: Round,
    cScrCount,
    pScrCount,
    soundEnabled: spickrbtn.checked,
    pScoreText: pScoreCount.innerHTML,
    cScoreText: cScoreCount.innerHTML,
    msgText: msg.innerHTML,
    pScoreColors: [...pScore].map(el => el.style.backgroundColor),
    cScoreColors: [...cScore].map(el => el.style.backgroundColor),
    themeChecked: btn.checked,
    gzoneBg: gzone.style.backgroundImage
  };

  localStorage.setItem("gameState", JSON.stringify(gameData));
});


