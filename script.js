const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const dsound=document.getElementById('dsound');
const csound=document.getElementById('csound');


const figureParts=document.querySelectorAll('.figure-part');

const words=['applıcatıon','gevsek','ınterface','wızard','delıkanlı','adam','javascrıpt'];

let selectedWord=words[Math.floor(Math.random() * words.length)];
const correctLetters=[];
const wrongLetters=[];

//Show hidden word
function displayWord() {/* secilen kelimeyi parcalara ayir arrayde dolas eger harf icindeyse yaz yoksa '' koy sonra join ile arrayi tekrar birlestir kelime yap */ 
    wordEl.innerHTML=`  
    ${selectedWord
    .split('')
    .map(letter => `
    <span class="letter">
     ${correctLetters.includes(letter)?letter:''}
    </span>
    `).join('')}
    `;
    const innerWord=wordEl.innerText.replace(/\n/g,'');
  if (innerWord===selectedWord) {
      finalMessage.innerText='Congratulations';
      popup.style.display='flex';
      csound.play();
  }
}
//Update wrong letters
function updateWrongLettersEl() {

	// Display wrong letters
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

//Display parts
  figureParts.forEach((part,index)=>{
    const errors=wrongLetters.length;
    if (index < errors) {
        part.style.display='block';
    }
    else{
        part.style.display='none';
    }
  });

//Check if lost
if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText='You have lost ';
    popup.style.display='flex';
    dsound.play();
}

}





//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    }, 2000);
}



//Keydown letter press
window.addEventListener('keydown',e => {
    // console.log(e.keyCode)
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log(123)
        const letter=e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);


                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);


                updateWrongLettersEl();
            }else{
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click',()=>{
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();

    updateWrongLettersEl();

    popup.style.display='none';
})



displayWord();