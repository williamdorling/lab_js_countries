const fetchCountriesData = async () =>{
    const countriesData = await fetch("https://restcountries.com/v3.1/all");
    const countriesDataJson = await countriesData.json();
    return countriesDataJson;
}

// populate countriesJson using fetchCountriesData
// remove <p> tag from index.html
// loop through countriesJson
// create li element
// append country name and population to li element
// add li element to ul

const submitButton = document.querySelector("#submit");


// replaces list with "Searching..."
const delaySearch = () => {
    document.querySelector("ul").innerHTML = "Searching...";
}


// takes json list of country data and populates list in HTML with country name, flag, and population
const generateList = (countriesList) =>{
    const countryList = document.querySelector("ul");
    countryList.innerHTML = "";
    countriesList.forEach((country) => {
        const listElement = document.createElement("li");
        const countryName = country.name.common;
        const countryPopulation = country.population;
        const flag = country.flag;
        listElement.innerText = countryName + " " + flag + ", population: " + countryPopulation;
        countryList.appendChild(listElement);
    })
}


const setUp = async () => {
    try{
        const countriesList = await fetchCountriesData();

        generateList(countriesList);

        // submitButton.addEventListener("click", event => {
        //     delaySearch();
        //     const input = document.querySelector("#country-search").value.toLowerCase();
        //     // console.log(input);
        //     const filteredList = countriesList.filter(country => country.name.common.toLowerCase().startsWith(input));
        //     // console.log(filteredList);
        //     setTimeout(function(){generateList(filteredList);},1000);
        // });
        
        const formInput = document.querySelector('#country-search');

        formInput.addEventListener("input", event =>{
            delaySearch();
            const input = document.querySelector("#country-search").value.toLowerCase();
            const filteredList = countriesList.filter(country => country.name.common.toLowerCase().startsWith(input));
            setTimeout(function(){generateList(filteredList);}, 300);
        })
    }

    catch(err){
        const errorText = document.createElement("h2");
        errorText.innerHTML = "Error accessing countries API";
        document.querySelector("body").appendChild(errorText);
    }
}

setUp();
