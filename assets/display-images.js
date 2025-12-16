

function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function() {
    const currentURL = window.location.pathname;

    if (currentURL.startsWith("/collections"))
    {
            const imagesString = document.querySelector('#collect-images');
            
            
            if(!imagesString.dataset.images){
                console.error("Error: Problem setting images");
                console.trace();                
            } else {
                
                let imagesArray = imagesString.dataset.images.split("files/").filter(Boolean);
                function imageSource(images) {
                
                return images[randomIntFromInterval(0, images.length - 1)]
            }
            
            document.querySelector("#featured-image").setAttribute("src", `/cdn/shop/files/${imageSource(imagesArray)}`);   
            
            setInterval(() => {
                document.querySelector("#featured-image").setAttribute("src", `/cdn/shop/files/${imageSource(imagesArray)}`);
                
            }, 3500);
            setInterval(() => {
                document.querySelector("#featured-image").classList.remove("blur-xs")
            }, 1000);
            }
            
            
    } else {
        return;
    }
    
    
});
