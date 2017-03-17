var appId = "d9a232fe930f870ab0c081d080a29895";
let temp;
let title;
let humidity;
let wind;
let wType;
let url;  
let rain = document.getElementById('rain');
let about = document.getElementById('about');
let yes = document.getElementById('yes');
let inputField = document.getElementById('input');
let wIcon = document.getElementById('wIcon');
let iconImg = document.getElementById('iconImage');
let resCont = document.getElementById('resCont');
    
smoothScroll.init();

function capitalize(string) {
	let lowC = string.toLowerCase();
	let x = lowC.charAt(0);
	let newString = '';
	let isSpace = true;
	for (x = 0; x < lowC.length; x++){
		let letter = lowC.charAt(x);
		if (isSpace){
			newString += letter.toUpperCase();
			isSpace = false;
		}
		else {
			newString += letter;
		}
		if (letter == ' '){
			isSpace = true;
		}
	}
	return newString;
}

function getWeatherUpdate(){
        let cityName = inputField.value;
        let url = "api.openweathermap.org/data/2.5/weather";
        console.log(inputField.value);
        
        let req = new XMLHttpRequest();
        req.onreadystatechange = function(){
            if(req.readyState == 4 && req.status == 200){
                let data = JSON.parse(req.responseText);
                temp = data.main.temp;
                wType = capitalize(data.weather[0].description);
                title = data.name + ", " + data.sys.country;
                humidity = data.main.humidity;
                wind = data.wind.speed;
                let result = document.getElementById('result');
                resCont.style.display = 'flex';
                let iconNo = data.weather[0].icon;
                //result.style.display = 'block';
                //wIcon.style.display = 'block';
                //iconImg.style.display = 'block';
                result.innerHTML = "Location: " + title + "<br>Temperature: " + temp  + "°C <br>Weather: " + wType + "<br>Wind: " + wind + "m/s<br>Humidity: " + humidity + "%";
                iconImg.src = "http://openweathermap.org/img/w/" + iconNo + ".png";
                //console.log("Long: "+data.coord.lon);
                //console.log("Lat: "+data.coord.lat);
                /*result.innerHTML = "Location: " + data.name + "<br>" + " Temperature: " + data.main.temp + "°C <br> Weather type: " + data.weather[0].description;*/
            }
        };
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + appId + "&units=metric");
        req.send();
    console.log(req.statusText);
};

rain.addEventListener('click', getWeatherUpdate);
input.addEventListener('keypress', function(e){
    if (e.keyCode == 13){
        getWeatherUpdate();
    }
});
    


    /*
    yes.addEventListener('click', function(event){
        rain.style.display = 'block';
        yes.style.display = 'none';
    });
    *//*
    rain.addEventListener('mouseover', function(event){
        rain.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    })
    rain.addEventListener('mouseleave', function(event){
        rain.style.backgroundColor = 'rgba(210, 210, 210, 0.5)';
   })*/
