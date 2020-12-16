//get id
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Get Quote from api
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl+ apiUrl);
        const data = await response.json();
    
        //put author 'Unknown' for empty
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font size for long quotes
        if(data.quoteText.length >50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;


        // console.log(data.quoteAuthor);
        // console.log(data);
        removeLoadingSpinner();
    }catch(error) {
        getQuote();
    }
}

//Tweet Quotes
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//show complete
function removeLoadingSpinner(){
    if(!loader.hidden){
        loader.hidden =true;
    quoteContainer.hidden =false;
    }
}

//add eventLisner
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

//on load
getQuote();