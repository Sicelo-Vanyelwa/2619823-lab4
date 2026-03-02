
// const searchBtn = document.getElementById('search-btn');
// const countryInput = document.getElementById('country-input');
// const spinner = document.getElementById('loading-spinner');
// const countryInfo = document.getElementById('country-info');
// const borderSection = document.getElementById('bordering-countries');
// const errorMessage = document.getElementById('error-message');
// async function searchCountry(countryName) {
//     try {
//         const searchbtn = document.getElementById("search-btn");
//         searchbtn.classList.add("loading-spinner");
//         //searchbtn.classList.remove("loading-spinner");

//         //Show loading spinner
//         const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//         const data = await response.json();
//         const country = data[0];

//         // Fetch country data
//     document.getElementById('country-info').innerHTML = `
//     <h2>${country.name.common}</h2>
//     <p><strong>Capital:</strong> ${country.capital[0]}</p>
//     <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
//     <p><strong>Region:</strong> C${country.region}</p>
//     <img src="${country.flags.svg}" alt="${country.name.common} flag">
// `;
//         // Update DOM
//         // let myObject = {};
//         // myObject.borders = data.borders;
//         // for(let i = 0; i < myObject.borders.length; i++){
//         // const response = await fetch(`https://restcountries.com/v3.1/alpha/${myObject.borders[i]}`);
//         // const data = await response.json();
//         // document.getElementById("bordering-countries").innerHTML =`<p>${data.borders}</p>
//         // <img src="${data.flags.svg}" alt="${data.name.common} flag"></img>`;

//         // }
        
//         // Fetch bordering countries
    


//         // Update bordering countries section
//     } catch (error) {
//         console.log(error);
//         // Show error message
//     } finally {
//         searchbtn.classList.remove("loading-spinner");
//         // Hide loading spinner
//     }
// }

const searchBtn = document.getElementById('search-btn');
const countryInput = document.getElementById('country-input');
const spinner = document.getElementById('loading-spinner');
const countryInfo = document.getElementById('country-info');
const borderSection = document.getElementById('bordering-countries');
const errorMessage = document.getElementById('error-message');

async function searchCountry(countryName) {
    if (!countryName) {
        showError("Please enter a country name.");
        return;
    }

    try {
        // Show loading spinner
        spinner.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        countryInfo.classList.add('hidden');
        borderSection.classList.add('hidden');

        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if (!response.ok) {
            throw new Error("Country not found.");
        }

        const data = await response.json();
        const country = data[0];

        // Update main country info
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        countryInfo.classList.remove('hidden');

        // Fetch bordering countries
        if (country.borders) {
            borderSection.innerHTML = "";

            for (let code of country.borders) {
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                const borderCard = `
                    <div class="border-card">
                        <p>${borderCountry.name.common}</p>
                        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag">
                    </div>
                `;

                borderSection.innerHTML += borderCard;
            }

            borderSection.classList.remove('hidden');
        } else {
            borderSection.innerHTML = "<p>No bordering countries.</p>";
            borderSection.classList.remove('hidden');
        }

    } catch (error) {
        showError(error.message);
    } finally {
        // Hide spinner
        spinner.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Click event
searchBtn.addEventListener('click', () => {
    const country = countryInput.value.trim();
    searchCountry(country);
});

// Enter key event
countryInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        searchCountry(countryInput.value.trim());
    }
});

// // Event listeners
// document.getElementById('search-btn').addEventListener('click', () => {
//     const country = document.getElementById('country-input').value;
//     searchCountry(country);
// });