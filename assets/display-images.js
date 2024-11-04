
function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
}
      
      
$(document).ready(() => {
    // Access the data attribute
    const imagesString = $('.collect-images').data('images');
    // Step 1: Split the string at each occurrence of "files/"
    let imagesArray = imagesString.split("files/");

    // Step 2: Add "files/" back to each element (ignoring the first empty element)
    imagesArray = imagesArray
    .filter(Boolean)
    .map(image => "files/" + image); // Add "files/" prefix back


    function imageSource(images) {
       return images[randomIntFromInterval(0, images.length - 1)]
    }
    
    setInterval(() => {
        $("#featured-image").attr("src", `/cdn/shop/${imageSource(imagesArray)}`);
        
    }, 3500);


  });