let input=document.querySelector('#input');
let searchBtn =document.querySelector('#search');
let apiKey = '05ba193a-919e-4171-bade-5362582de717';
let notFound = document.querySelector('.not_found');
let defBox = document.querySelector('.def');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

searchBtn.addEventListener('click', function(e)
{
    e.preventDefault();
    //clear data
    audioBox.innerHTML = ''; 
    notFound.innerHTML = '';
    defBox.innerHTML = '';

    // Get input data
    let word=input.value;
    //call API get data
    if(word==''){
        alert('Word is required !!');
        return;
    }

    getData(word);
})

//Search feature integrate with Enter keypress
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("search").click();
  }
});

async function getData(word){
    loading.style.display = 'block';
    //Ajax Call
    const response= await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    // console.log(data);

    // If empty result
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText='No Results Found!';
        return;
    }

    //If result is suggestions
    if(typeof data[0]=='string'){
        loading.style.display = 'none';
        let heading=document.createElement('h3');
        heading.style.color = '#2b458a';
        heading.innerText = 'Did You Mean ?';
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion =document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return;
    }

    //Results Found
    loading.style.display = 'none'; 
    let defination= data[0].shortdef[0];
    defBox.innerText=defination;

    // Sound 
    const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            renderSound(soundName);
        }


    console.log(data);
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}