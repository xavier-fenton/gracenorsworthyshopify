/**
  Todo:
    Close one tab if opening another eg: cart open and user clicks info, close cart so info opens
 */



function toggleSlideUp() {
  document.getElementById('mobile-menu').classList.toggle('translate-y-full');
  document.getElementById('mobile-menu').classList.toggle('active');

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