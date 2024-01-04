const ENDPOINT = "./data/nzbird.json";
let allBirds = [];

async function fetchBirds() {
    const response = await fetch(ENDPOINT);
    allBirds = await response.json();
    displayBirds(allBirds);
}

function displayBirds(birds) {
    const container = document.querySelector(".flex-container");
    container.innerHTML = '';
    birds.forEach(addBirdstoPage);
}


function addBirdstoPage(birds){
    container = document.querySelector(".flex-container");
    newElement = document.createElement("div")
    newElement.setAttribute("class", "flex-box")
    newElement.setAttribute("id","birdcards")

    newElement.innerHTML = `
    

    <img src = ${birds.photo.source} alt="bird">
    <p class ="primary_name" style="color:${txtOverImgColour(birds.primary_name)}">${birds.primary_name}</p>
    <p class="photo_credit" style="color:${txtOverImgColour(birds.primary_name)}">Photo by ${birds.photo.credit}</p>
    <p class="english-name">${birds.english_name}</p>
    <hr style = "background-color:${displayColour(birds.status)}">
    
    <div id="row">
    <div class="column">
        <ul class = "bird-desc">
            <li><span><strong>Scientific name</strong></span></li>
            <li><span><strong>Family</strong></span></li>
            <li><strong>Order</strong></li>
            <li><strong>Status</strong></li>
            <li><strong>Length</strong></li>
            <li><strong>Weight</strong></li>
        </ul>
    </div>
    <div class="column">
        <ul class ="bird-desc">
            <li>${birds.scientific_name}</li>
            <li>${birds.family}</li>
            <li>${birds.order}</li>
            <li>${birds.status}</li>
            <li>${birds.size.length.value}&nbsp;&nbsp;${birds.size.length.units}</li>
            <li>${birds.size.weight.value}&nbsp;&nbsp;${birds.size.weight.units}</li>
        </ul>
    </div>
    </div>
    

    <div class="circle" style = "background-color:${displayColour(birds.status)}"></div> 

    `

    container.append(newElement);

}

fetchBirds()

function searchBirds(e) {
    e.preventDefault();

    const searchInput = document.querySelector("#searchbox").value.toUpperCase();
    const conservationValue = document.querySelector("#conservation").value;
    const conservationStatus = mapConservationValueToStatus(conservationValue);

    let results = allBirds.filter(bird => {
        let matchS = bird.primary_name.toUpperCase().includes(searchInput) ||
                     bird.english_name.toUpperCase().includes(searchInput) ||
                     bird.family.toUpperCase().includes(searchInput) ||
                     bird.scientific_name.toUpperCase().includes(searchInput) ||
                     bird.order.toUpperCase().includes(searchInput);

        let matchCat = (conservationStatus === "All" || bird.status === conservationStatus);

        return matchS && matchCat;
    });

    displayBirds(results);
}

function mapConservationValueToStatus(value) {
    const statuses = ["All", "Not Threatened", "Naturally Uncommon", "Relicit", "Recovering", "Declining", "Nationally Increasing", "Nationally Vulnerable", "Nationally Endangered", "Nationally Critical", "Data Deficient"];
    return statuses[parseInt(value)];
}

function sortBirds() {
    const sortBy = document.querySelector("#sort-by").value;

    allBirds.sort((a, b) => {
        if (sortBy === "0") {  // Sort by weight (lightest to heaviest)
            const weightA = a.size.weight.value;
            const weightB = b.size.weight.value;

            if (weightA === undefined) return 1;
            if (weightB === undefined) return -1;

            return weightA - weightB;
        } else if (sortBy === "1") {  // Sort by length (smallest to largest)
            const lengthA = a.size.length.value;
            const lengthB = b.size.length.value;

            if (lengthA === undefined) return 1;
            if (lengthB === undefined) return -1;

            return lengthA - lengthB;
        } else if (sortBy === "2") {  // Alphabetical order by name
            return a.primary_name.localeCompare(b.primary_name);
        } else if (sortBy === "3") {  // Alphabetical order by family
            return a.family.localeCompare(b.family);
        }
    });

    displayBirds(allBirds);
}

    displayBirds(allBirds);

function displayColour(birds){

    let colour ="";

    if(birds == "Not Threatened"){
        colour= "#02a028";
    }else if(birds == "Naturally Uncommon"){
        colour="#649a31";
    }else if(birds == "Relicit"){
        colour="#99cb68"; 
    }else if(birds == "Recovering"){
        colour="#fecc33";
    }else if(birds == "Declining"){
        colour="#fe9a01";
    }else if(birds == "Nationally Increasing"){
        colour="#c26967";
    }else if(birds == "Nationally Vulnerable"){
        colour="#9b0000";
    }else if(birds == "Nationally Endangered"){
        colour="#660032";
    }else if(birds == "Nationally Critical"){
        colour="#320033";
    }else if(birds == "Extinct"){
        colour="#000";
    }else if(birds == "Data Deficient"){
        colour="#000";
    }

    return colour;
}


        
function txtOverImgColour(birds){
    let colour="";
    if(birds == "K\u014dk\u0101"){
        colour="#000"
    }else if(birds == "Tawaki"){
        colour="#000"
    }else if(birds == "Tauhou"){
        colour="#000"
    }else if(birds == "K\u0101k\u0101riki karaka"){
        colour="#000"
    }else if(birds == "Kawau o Rangihaute"){
        colour="#000"
    }else if(birds == "Kiwi-nui"){
        colour="#000"
    }else if(birds == "T\u014drea tai"){
        colour="#000"
    }else if(birds == "P\u012bwakawaka"){
        colour="#000"
    }else if(birds == "T\u0113t\u0113 k\u0101k\u0101riki"){
        colour="#000"
    }else if(birds == "T\u012beke"){
        colour="#000"
    }else if(birds == "Tutukiwi"){
        colour="#000"
    }else if(birds == "Weka"){
        colour="#000"
    }else if(birds == "K\u0101k\u0101"){
        colour="#000"
    }else if(birds == "Korimako"){
        colour="#000"
    }else if(birds == "Kerer\u016b"){
        colour="#000"
    }else{
        colour="#F0F8FF"
    }

    return colour;
    }

// Event listeners
document.querySelector("#searchbox").addEventListener('input', searchBirds);
document.querySelector("#sort-by").addEventListener('change', sortBirds);
document.querySelector("#sort").addEventListener('click', searchBirds); // Assuming this button triggers the search

// Initialize
fetchBirds();
