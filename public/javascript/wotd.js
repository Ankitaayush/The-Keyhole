let word1 = document.querySelector('.word1');
let define1 = document.querySelector('.defn');
let pos1 = document.querySelector('.pos');
let eg1 = document.querySelector('.example');
let apiKey = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';


const api_url=`https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${apiKey}`
async function getData()
{
    const response = await fetch(api_url);
    const data = await response.json();
    
    const word=data.word;
    const define=data.definitions[0].text;
    const pos=data.definitions[0].partOfSpeech;
    const eg=data.examples[0].text;

    word1.innerText=word;
    define1.innerText=define;
    pos1.innerText=pos;
    eg1.innerText=eg;
}
getData();


//For getting current Date
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.querySelector('.date').innerHTML =d + " / " + m + " / " + y;
