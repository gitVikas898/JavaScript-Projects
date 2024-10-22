async function getFact(){
    const factDisplay = document.getElementById('fact-display');
    const loadingDisplay = document.getElementById('loading');
    const buttonDisplay = document.getElementById('generate-btn');
    const url = 'https://catfact.ninja/fact';

    factDisplay.style.display = 'none';
    loadingDisplay.style.display = 'block';
    buttonDisplay.style.display = 'none';

    const response = await fetch(url);
    const text = await response.json();

    factDisplay.textContent = text.fact;
    loadingDisplay.style.display = 'none';
    factDisplay.style.display = 'block';
    buttonDisplay.style.display = 'inline-block';
}



const imagesArray = ['img/cat-1.jpg','img/cat-2.jpg','img/cat-3.jpg','img/cat-4.jpg','img/cat-5.jpg'];

function changeBackground(){
    const containerElement = document.getElementById('container');
    const randomIndex = Math.floor(Math.random()*imagesArray.length);
    const newImage = imagesArray[randomIndex];

    containerElement.style.backgroundImage = `url('${newImage}')`;
}
document.getElementById('generate-btn').addEventListener('click',()=>{
    getFact();
    changeBackground();
});