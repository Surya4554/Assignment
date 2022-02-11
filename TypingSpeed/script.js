const array = [
    "Get inspired as you test your typing speed with this inspirational quotes typing speed test. Practice typing favorite quotes and watch your typing speed increase! Over 60 quotes available.",
    "Typing speed tends to be a little higher on the inspirational quotes test because of the short length of the text to type. You can often reach higher bursts of speed on shorter typing tests.",
    "With practice you should be able to reach and maintain this typing speed more often and for an increasingly longer time.",
    "If you don't like a test prompt, you can get a different (random) prompt with the button - or select your favorite quote to type from the list below. To find out how fast you type, just start typing in the blank textbox on the right of the test prompt.",
    "You will see your progress, including errors on the left side as you type. In order to complete the test and save your score, you need to get 100% accuracy. You can fix errors as you go, or correct them at the end with the help of the spell checker.",
    "To find out how fast you type, just start typing in the blank textbox on the right of the test prompt. You will see your progress, including errors on the left side as you type.",
    "You can fix errors as you go, or correct them at the end with the help of the spell checker. If you need to restart the test, delete the text in the text box. Interactive feedback shows you your current wpm and accuracy.",
    "Need help composing your next resume or cover letter? Do you struggle with writer's block when it's time to start an essay or report? Try a week of Copy.ai for free. Copy.ai is like having a team of writers at your fingertips, offering suggestions to help you get started and keep going on all your writing projects.",
    "Our typing tests are ranked on level of difficulty. The algorithm to calculate difficulty depends on the average word length and how many special characters like capitals, numbers and symbols are included in the text. Most standard pre-employment typing tests will be in the normal range. You should expect to get higher wpm scores on easier tests and lower wpm scores on the more difficult tests."
];

const quote = document.getElementById('quoteDisplay');
const userQuote = document.getElementById('quoteInput');
const btn = document.getElementById('btn');
let timer = document.getElementById('timer');
let startTime , endTime, startingTime;



const playTyping = () => {
    
    
    let randomNumber = Math.floor(Math.random()*array.length);
    quote.innerText = array[randomNumber];
    let date = new Date();
    startTime = date.getTime();
    btn.innerText = "Done";
    startTimer();
}
const endTyping = () => {
    let date = new Date();
    endTime = date.getTime();
    let totalTime = ((endTime - startTime) / 1000);
    // console.log(totalTime);

    let totalString = userQuote.value;
    let wordCount = wordCounter(totalString);
    if(wordCount == 1){
        finalMessage = "Error!!!! You are not Typing Something. Please Start Again "
        quote.innerText = finalMessage;
    }else{
    let speed = Math.round((wordCount / totalTime) * 60);
    let finalMessage = " Your Actual Speed is " +speed+ " Words Per Minutes . ";
    finalMessage += compareWords(quote.innerText, totalString);
    quote.innerText = finalMessage;
    }
}
const compareWords = (str1, str2) => {
      let words1 = str1.split(" ");
      let words2 = str2.split(" ");
      let accurate = 0;

      words1.forEach(function (item, index){
          if(item == words2[index]){
              accurate++;
          }
      })

      let error = (words2.length - accurate);
      return (accurate + " Correct Out of " + words2.length + " Words and the Total number of Errors are "+ error + "..")
}

const wordCounter = (str) => {
    let response = str.split(" ").length;
    // console.log(response);
    return response;
}

btn.addEventListener('click', function(){
    if(this.innerText == 'Start'){
        userQuote.disabled = false;
        playTyping();
    }else if(this.innerText == "Done"){
        userQuote.disabled = true;
        btn.innerText = "Start";
        endTyping();
    }
})
const startTimer = () => {
    timer.innerText =0;
    startingTime = new Date();
    setInterval(() =>{
       timer.innerText = getTimerTime();
    }, 1000)
}
const getTimerTime = () => {
    return Math.floor((new Date() - startingTime)/ 1000);
}