const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0
let totalImages = 0
let photosArray = [];

//unsplash api
let imagesLoadingCount = 5;
const apiKey = "KhqzaY-CzYDP_hyLGRuXpupbmTWTETzHifbChjTh7lM";

let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imagesLoadingCount}`;


//get photos from unsplash api
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        console.log(error);
    }
}

//create elements for links and photos
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("totalImages=", totalImages);
    
    //run function for each object in photos array
    photosArray.forEach(photo => {
        //link to unsplash
        const item = document.createElement("a");

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        //create image
        const img = document.createElement("img");
        // img.setAttribute("src", photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute("title", photo.alt_description);

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //event listener, check when each is finished loading
        img.addEventListener("load", imageLoaded)
        //put img inside a tag, then put both in image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//helper function for setAttributes
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded(){
    console.log("images loaded");
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log("ready = ", ready);
        imagesLoadingCount = 10;
    }
}

//check to see if scrolling is near bottom of page, load more photos
window.addEventListener("scroll", () => {
    //console log and checkout these values
    console.log('innerHeight', window.innerHeight)
    console.log('scrollY', window.scrollY)
    console.log('offsetHeight', document.body.offsetHeight)
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        console.log("load");
        ready = false;
        getPhotos();
    }
})

//on load
getPhotos()