var counter = 0;

var requestComplete = function() {  //writing our callback function
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var country = countries[Math.floor(Math.random() * countries.length)];
  var country2 = countries[Math.floor(Math.random() * countries.length)];
  var country3 = countries[Math.floor(Math.random() * countries.length)];
  var country4 = countries[Math.floor(Math.random() * countries.length)];
  var savedScore = localStorage.getItem("score");
  createUI(country);
  createButton('#button1', country, country);
  createButton('#button2', country2, country);
  createButton('#button3', country3, country);
  createButton('#button4', country3, country);
  shuffleButtons();
  var savedScore = JSON.parse(localStorage.getItem("score", counter))
  if (savedScore) {
    counter = savedScore;
  }
  createScore(counter);
  createNextButton();
  createNewGameButton();
  var container = document.getElementById('map');
  var center = { lat: country.latlng[0], lng: country.latlng[1] }
  var map = new Map(container, center, 2)
  map.addMarker(center);
}

var createUI = function(country) {
    var text = document.querySelector('#country-name');
    text.innerText = country.name;
    return text;
}

var createButton = function(id, countryButton, countryAnswer) {
  var button = document.querySelector(id);
      if (countryButton.capital) {
        button.innerText = countryButton.capital;
      } else {
        button.innerText = "Paris";
      }
      button.onclick = function() {
        var answer = document.querySelector('#answer');
        if(this.innerText === countryAnswer.capital) {
        answer.innerText = "CORRECT!! The answer is... " + countryAnswer.capital;
        answer.style.visibility = "visible";
        counter++;
        createScore(counter);
        localStorage.setItem("score", counter);
      }else {
        answer.innerText = "OOPS! The answer is actually... " + countryAnswer.capital;
        answer.style.visiblity = "visible";
      }
    }
}

var createNextButton = function() {
  var button = document.querySelector('#next-button');
  button.onclick = function() {
    window.location.reload();
  }
}

var createNewGameButton = function() {
  var button = document.querySelector('#new-game-button');
  button.onclick = function() {
    localStorage.clear();
    window.location.reload();
  }
}

var shuffleButtons = function() {
  var parent = document.getElementById("shuffle");
  var buttons = parent.children;
  var frag = document.createDocumentFragment();
  while (buttons.length) {
      frag.appendChild(buttons[Math.floor(Math.random() * buttons.length)]);
  }
  parent.appendChild(frag);
}

var createScore = function(counter) {
  var score = document.querySelector('#score');
  score.innerText = "You current score is " + counter;
  localStorage.setItem("score", counter);
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();  
  request.open("GET", url); //set what kind of request we want to get
  request.onload = callback; //set callback we want once request is completed
  request.send(); //send it
}


var app = function(){
  var url = "https://restcountries.eu/rest/v1/all";
  makeRequest(url, requestComplete); //passing url to our function
}

window.onload = app;