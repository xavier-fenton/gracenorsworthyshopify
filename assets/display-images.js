

function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
}

document.addEventListener("DOMContentLoaded", function() {
    
    const imagesString = document.querySelector('#collect-images');
    let imagesArray = imagesString.dataset.images.split("files/").filter(Boolean);
    
    function imageSource(images) {
        console.log(images[randomIntFromInterval(0, images.length - 1)]);
        
        return images[randomIntFromInterval(0, images.length - 1)]
    }
    
    document.querySelector("#featured-image").setAttribute("src", `/cdn/shop/files/${imageSource(imagesArray)}`);   
    
    setInterval(() => {
         document.querySelector("#featured-image").classList.remove("blur-xs")
         document.querySelector("#featured-image").setAttribute("src", `/cdn/shop/files/${imageSource(imagesArray)}`);
         
     }, 3500);
     setInterval(() => {
        document.querySelector("#featured-image").classList.remove("blur-xs")

        
    }, 1000);
    
});
