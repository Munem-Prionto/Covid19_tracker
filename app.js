// FROM STACK OVERFLOW START
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
//FROM STACK OVERFLOW END


const global = document.querySelector('#global');
const form = document.querySelector('#form');
const input =document.querySelector('#input');
const eachCounty = document.querySelector('#eachCountry');
const list = document.querySelector('#list');
list.innerHTML = '';

const covidInfo = async () => {
    const base = 'https://api.covid19api.com/summary';
    const response = await fetch(base);
    const dataArray = await response.json();
    return dataArray;
 
}


    covidInfo()
    .then(data => {
        const globalInfo = data.Global;
        
        console.log(globalInfo);
        global.innerHTML =
        `
        <p>New Cases : ${numberWithCommas(globalInfo.NewConfirmed)}</p>
        <p>Total Cases : ${numberWithCommas(globalInfo.TotalConfirmed)}</p>
        <p>New Recovered : ${numberWithCommas(globalInfo.NewRecovered)}</p>
        <p>Total Recovered : ${numberWithCommas(globalInfo.TotalRecovered)}</p>
        <p>New Deaths : ${numberWithCommas(globalInfo.NewDeaths)}</p>
        <p>Total Deaths : ${numberWithCommas(globalInfo.TotalDeaths)}</p>
        `;
       
    })
    .catch(err => {
        console.log(err)
    });



    form.addEventListener('submit' , e=> {
        e.preventDefault();
        eachCounty.innerHTML = '';
        
        
        if(input.value.length > 0) {
            const inputValue = input.value.trim().toLowerCase();
            covidInfo()
            .then(data => {
                const countryArray = data.Countries;
                const filterArray = countryArray.filter(country => {
                        return country.Slug == inputValue;
                 })
                    
                    const currentCountry = filterArray[0];
                    eachCounty.innerHTML = 
                    `
                    <p class="country">${currentCountry.Country}</p>
                    <p>New Cases : ${numberWithCommas(currentCountry.NewConfirmed)}</p>
                    <p>Total Cases : ${numberWithCommas(currentCountry.TotalConfirmed)}</p>
                    <p>New Recovered : ${numberWithCommas(currentCountry.NewRecovered)}</p>
                    <p>Total Recovered : ${numberWithCommas(currentCountry.TotalRecovered)}</p>
                    <p>New Deaths : ${numberWithCommas(currentCountry.NewDeaths)}</p>
                    <p>Total Deaths : ${numberWithCommas(currentCountry.TotalDeaths)}</p>
                    `;
              
            });
        }



        form.reset();
    });

    covidInfo()
        .then(data => {
            const allCountry = data.Countries;
            allCountry.forEach(country => {
                list.innerHTML += `<li>${country.Country} = ${country.Slug}</li>`
                console.log(`${country.Country} = ${country.Slug}`);
            });
        })

