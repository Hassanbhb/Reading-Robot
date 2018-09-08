
//call the html5 text to speech api
const synth = window.speechSynthesis;

//get dom elements
const inputForm = document.querySelector('textarea');
const rate = document.querySelector('#rate-input');
const pitch = document.querySelector('#pitch-input');
const select = document.querySelector('#options');
const button = document.querySelector('.btn');
const form = document.querySelector('form');

let voices = [];

//populate the select element with voice options
const getVoices = () => {
    //get the voices array
    voices = synth.getVoices();
    //loop through each voice and append it to the select element
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' ('+ voice.lang +')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        //this line is for materialize
        M.FormSelect.init(select, option);
        //populate the select element
        select.appendChild(option);
    })
    
}

//button event listener to fire the speak function
//when the text area is not empty
button.addEventListener('click', e => {
    e.preventDefault();
    if(synth.speaking){
        console.error('Not Don yet!!');
    }else if(inputForm.value !== ''){
        speak();
        inputForm.blur();
    }
    
} )


const speak = () => {
    const talk = new SpeechSynthesisUtterance(inputForm.value);
    const selectedOption = select.selectedOptions[0].getAttribute('data-name');
    //loop through the voices array and compare each
    //one id they match the selected voice by the user
    //then use the matching voice
    for(i=0; i<voices.length; i++){
        if(voices[i].name === selectedOption){
            talk.voice = voices[i];
        }
    };

    //adding the pitch and rate values
    talk.pitch = pitch.value;
    talk.rate = rate.value;
    synth.speak(talk);
  
    //let me know when the speech ends
    talk.onend = e => {
        console.log("Speech ended.");
    };
    
    talk.onerror = e => {
        console.error('Something went wrong');
    }


}






synth.onvoiceschanged = function() {
    getVoices();
};