smoothScroll.init();

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}


window.onscroll = function() {
	if (window.scrollY >= 700 && window.scrollY < 1100){
        document.getElementById('startLink').className = '';
        document.getElementById('projektLink').className = 'active';
		document.getElementById('kontaktLink').className = '';
    }  
    else if (window.scrollY >= 1100 ){
       document.getElementById('startLink').className = '';
        document.getElementById('projektLink').className = '';
        document.getElementById('kontaktLink').className = 'active';
    }
	else if (window.scrollY < 400 ){
       document.getElementById('startLink').className = 'active';
        document.getElementById('projektLink').className = '';
        document.getElementById('kontaktLink').className = ''; 
    }
}