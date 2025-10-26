/**
  Todo:
      [] Close one tab if opening another eg: cart open and user clicks info, close cart so info opens

      [] Change the colour of text given the background color
 */

// Ajax Cart init
function runWhenInit() {
  console.log("The current cart state is: ", window.liquidAjaxCart.cart);
}

if (window.liquidAjaxCart?.init) {
  // if Liquid Ajax Cart is already initialized
  runWhenInit();
} else {
  // wait for Liquid Ajax Cart to be initialized
  document.addEventListener("liquid-ajax-cart:init", runWhenInit);
}     


function toggleSlideUp() {
  document.getElementById('mobile-menu').classList.toggle('translate-y-full');
  document.getElementById('mobile-menu').classList.toggle('active');
  document.body.classList.toggle("!overflow-y-hidden")
  let menuButton = document.getElementById('menu')
  if(menuButton.innerHTML == "close")
  {
    menuButton.innerHTML = "menu"
  } else
  {
    menuButton.innerHTML = "close"
  }


}

function togglePageMenu() {
  document.getElementById("infoTab").classList.toggle('hidden')
  document.getElementById("infoTab").classList.toggle('active')

 


  
}

function toggleCart() {
  document.getElementById("toggle-cart").classList.toggle('hidden')
  
};

function toggleInfo(title) {


  document.getElementById(`page-info-${title}`).classList.toggle('hidden')

}