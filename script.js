/*
fetch(`https://api.nasa.gov/planetary/apod?api_key=pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el`)
.then(response => {
    return response.json();
})
.then(data => console.log(data))
.catch(err => console.log(err));

const page = (title, name) => {
    return `
    <div>
        <title>${title}</title>
        <img name="${name}">
        <p></p>
    </div>
    `
};

const pageElements = `
    ${page()}

`


const renderNasa = (title, date, imgSource, explanation) => {
    //console.log(arr);
    return `
        <div>
            <h1>${title}</h1>
            <p>${date}</p>
            <img src="${imgSource}">
            <p>${explanation}</p>
        </div>
    `
}

const nasaData = 
`
${renderNasa("Astronomy Picture of the Day", "nasaInfo.date", "https://image.flaticon.com/icons/png/512/91/91544.png", "something")}
    `

    
    
    async function loadEvent() {
        const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el`);
        const nasaInfo = await nasaRes.json()
        console.log(nasaInfo);
        renderNasa(nasaInfo);
        
        const root = document.getElementById("root");
        root.insertAdjacentHTML("beforeend", nasaData);
    }
    
    window.addEventListener("load", loadEvent)
    */
   
/*
function loadEvent() {
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('authors');
const url = 'https://randomuser.me/api/?results=10';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let authors = data.results;
  return authors.map(function(author) {
    let li = createNode('li');
    let img = createNode('img');
    let span = createNode('span');
    img.src = author.picture.medium;
    span.innerHTML = `${author.name.first} ${author.name.last}`;
    append(li, img);
    append(li, span);
    append(ul, li);
  })
})
.catch(function(error) {
  console.log(error);
});


}

window.addEventListener("load", loadEvent);
*/


/*
function loadEvent() {
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const root = document.getElementById('root');
const url = 'https://api.nasa.gov/planetary/apod?api_key=pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  return authors.map(function(author) {
    let img = createNode('img');
    let p = createNode('p');
    img.src = data.url;
    p.innerHTML = data.explanation;
    append(root, img);
    append(root, p);
  })
})
.catch(function(error) {
  console.log(error);
});


}

window.addEventListener("load", loadEvent);

*/
/////////////////////////////////////////////////////

/*
const fetchNASAData = async () => {
  try {
    const nasaResponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el");
    const data = await nasaResponse.json();
    //console.log('NASA APOD data', data);
    displayData(data);
  } 
  catch (error) {
    console.log(error);
  }
};

const displayData = (data) => {
  document.getElementById('title').textContent = data.title;
  document.getElementById('date').textContent = data.date;
  document.getElementById('imageOfToday').src = data.hdurl;
  document.getElementById('explanation').textContent = data.explanation;
};

fetchNASAData();
*/
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth()+1;
let todayDate = String(date.getDate()).padStart(2,'0');
let datePattern = year + '-' + month + '-' + todayDate;
document.getElementById("datepicker").value = datePattern;


let dateInput = document.getElementById("datepicker");
if (dateInput.value === datePattern) {
    nasarequested();
  };
  dateInput.addEventListener("input", (e) => {
   e.preventDefault();
   nasarequested();
});
  

function nasarequested() {
 let baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";
 let apiKey = "pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el";
 let dateInput = document.getElementById("datepicker");
 let title = document.getElementById("title");
 let mediaSection = document.getElementById("media-section");
 let explanation = document.getElementById("explanation");

 let currentDate = new Date().toISOString().slice(0, 10);


 let image = `
    <a id="hdimg" href="" target="-blank">
      <div class="imageDiv">
        <img id="imageOfTheDay" src="" alt="image-by-nasa">
      </div>
    </a>
 `;

 let video = `
    <div class="videoDiv">
      <iframe id="videoOfTheDay" src="" frameborder="0">
    </iframe></div>
 `;

 let chosenDate = "&date=" + dateInput.value;


 const fetchData = async () => {
  try{
  const response = await fetch(baseUrl + apiKey + chosenDate);
  const data = await response.json();
  displayData(data);
  
  }catch(error){
  console.log(error);
  }
};

 function displayData(data) {

  title.innerHTML = data.title;
  date.innerHTML = data.date;
  dateInput.max = currentDate;
  dateInput.min = "1995-06-16";

  if(data.media_type === "video") {
  mediaSection.innerHTML = video;
  document.getElementById("videoOfTheDay").src = data.url;

  }else{
  mediaSection.innerHTML = image;
  document.getElementById("hdimg").href = data.hdurl;
  document.getElementById("imageOfTheDay").src = data.url;
  }
  explanation.innerHTML = data.explanation
 }
 fetchData();
};