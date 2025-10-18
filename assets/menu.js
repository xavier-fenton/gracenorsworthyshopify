function toggleSlideUp() {
  document.getElementById('mobile-menu').classList.toggle('translate-y-full');
  let menuButton = document.getElementById('menu')
  if(menuButton.innerHTML == "close")
  {
    menuButton.innerHTML = "menu"
  } else
  {
    menuButton.innerHTML = "close"
  }
}