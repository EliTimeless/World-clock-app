setInterval(showWorldTime, 1000);

let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();
let seconds = time.getSeconds();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function showWorldTime() {
  const timeLO = new Date().toLocaleTimeString("en-US", {
    timeZone: "Europe/London",
  });
  let london = document.querySelector("#london");
  london.innerHTML = timeLO;

  const timeNY = new Date().toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
  });
  let newYork = document.querySelector("#new_york");
  newYork.innerHTML = timeNY;

  const timeSY = new Date().toLocaleTimeString("en-US", {
    timeZone: "Australia/Sydney",
  });
  let sydney = document.querySelector("#sydney");
  sydney.innerHTML = timeSY;

  const timeSH = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Shanghai",
  });
  let shanghai = document.querySelector("#shanghai");
  shanghai.innerHTML = timeSH;

  const timeTO = new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Tokyo",
  });
  let tokyo = document.querySelector("#tokyo");
  tokyo.innerHTML = timeTO;

  const timePR = new Date().toLocaleTimeString("en-US", {
    timeZone: "Europe/Prague",
  });
  let prague = document.querySelector("#prague");
  prague.innerHTML = timePR;
}
showWorldTime();

function showCurrTime(response) {
  let h1 = document.querySelector("#currentClock");
  h1.innerHTML = `YOUR LOCATION: ${response.data.name} ${hours}:${minutes}:${seconds}`;
}

function retrievePosition(position) {
  let apiKey = "ffbbbb548b237aed83af9997c794ee44";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrTime);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function search(event) {
  let cities = document.querySelector("#cities");
  let value = event.target.value;
  if (event.target.value === "current") {
    value = moment.tz.guess();
  }
}

if (value.length) {
  let searchTime = moment().tz(value);
  let city = value.split("/")[1].replace("_", " ");
  let time = searchTime.format("h:mm:ss A");
  let date = searchTime.format("MMMM Do YYYY");
  cities.innerHTML = `
		<div class="city">
			<div>					
				<h2>${city}</h2>
				<div class="date">${date}</div>
			</div>
			<div class="time">${time}</div>
		</div>
    `;
}

let select = document.getElementById("search");
select.addEventListener("change", search);
