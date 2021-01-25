const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];

function updateDOM() {
    console.log("This is updateDOM")
    resultsArray.forEach((result) => {
        console.log('iteration');
        // =================================== Create html elements ============================================
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link
        const link = document.createElement('a');
        link.href = result.hdurl;   // assign link href attribute to be the url of result 
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add to Favorites';
        // Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright
        const copyright = document.createElement('span');
        copyright.textContent = `${result.copyright}`;

        // =================================== Append child elements to their parents ============================
        footer.append(date, copyright);
        cardBody.append(cardTitle, cardText, saveText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        console.log(card);
    });
}

// Get 10 Images from NASA API
async function getImages() {
    try {
        const response = await fetch(apiUrl);
        const resultsArray = await response.json();
        console.log(resultsArray);
        updateDOM();
    } catch (error) {
        console.log('Error',error);
    }
}

// On load
getImages();