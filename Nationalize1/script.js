let body = document.body;


let container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML="<h1>Probability of Nationality</h1>";
body.appendChild(container);

let section1 = document.createElement("section");
container.append(section1);

let mv = document.createElement("div");
mv.setAttribute("id", "mv")
section1.append(mv)

let inputBox = document.createElement("div");
inputBox.setAttribute("class", "inputBox");
mv.append(inputBox);

let input = document.createElement("input");
input.setAttribute("id", "name");
input.setAttribute("class", "input");
input.setAttribute("placeholder", "Enter a person's name");
input.setAttribute('type', "text");
inputBox.append(input);

let submitButton = document.createElement("button");
submitButton.innerHTML = "SUBMIT";
submitButton.setAttribute("class", "button");
submitButton.setAttribute("onclick", "getPersonName();");
inputBox.append(submitButton);


function getPersonName() {
    let name = document.getElementById("name").value;
    nameProbability(name);
    console.log(name);
}

function nameProbability(name) {
    let url = "https://api.nationalize.io?name="+name;
    let rawData = async () => {
        try {
            let response = await fetch(url);
            if (!response.ok)
                throw new Error(response.status);
            let apiResponse = await response.json();
            console.log(apiResponse)
            if (apiResponse.country.length == 0)
                throw new Error("999");
            else {
                displayDetails(apiResponse);
            }
        }
        catch(err) {
            if (err.message == 401) {
                alert("Invalid API key")
            }
            else if (err.message == 402) {
                alert("Subscription is not active")
            } else if (err.message == 422) {
                alert("Invalid 'name' parameter")
            } else if (err.message == 429) {
                alert("Request limit reached")
            } else if (err.message == 999) {
                alert("This person's name does not exist in our data!")
            }
        }
    }
    rawData();
   
}

let outputBox = document.createElement("div");
outputBox.setAttribute("class","output");
inputBox.append(outputBox);


function displayDetails(data) {
    let dataTable;
    let country1;
    let country2;
    if (data.country.length == "1") {
       country1 = countryName(data.country[0].country_id);
       dataTable = `<table class = 'table-striped'>
        <tr>
        <th>
        Country
        </th>
        <br>
        <br>
        <th>
        Probability
        </th>
        </tr>
        <tr>
        <td>
         ${country1}
        </td>
        <td>
        ${data.country[0].probability}
        </td>
        </tr>
        </table>`;

    } else {
        country1 = countryName(data.country[0].country_id);
        country2 = countryName(data.country[1].country_id);
        dataTable = `
        
        <table border=2>
        <tr>
        <th>
        Country
        </th>
        <th>
        Probability
        </th>
        </tr>
        <tr>
        <td> 
        ${country1}
        </td>
        <td>
        ${data.country[0].probability}
        </td>
        </tr>
        <tr>
        <td>
         ${country2}
        </td>
        <td>
        ${data.country[1].probability}
        </td>
        </tr>
        </table>
        `;
    }
let oP = document.createElement("div");
oP.setAttribute("class", "oP");
oP.innerHTML = dataTable;
console.log(dataTable);

outputBox.append(oP);
}


function countryName(data) {
    let region = new Intl.DisplayNames(['en'], { type: 'region' });
    if (region.of(data))
        return region.of(data);
    else
        return data;
}