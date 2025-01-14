const URL = "https://v6.exchangerate-api.com/v6/f329cda4e083183153de9331/latest/USD";

let dropdown = document.querySelectorAll(".dropdown select");
let button = document.querySelector("form button");
let from = document.querySelector("#from");
let to = document.querySelector("#to");
let message = document.querySelector(".message");

for(select of dropdown){
    for(code in countryList){
        let option = document.createElement("option");
        option.innerText = code;
        option.value = code;
        if (select.name === "from" && code === "USD") {
            option.selected = "selected";
          } else if (select.name === "to" && code === "NPR") {
            option.selected = "selected";
          }
        select.append(option);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}

const updateFlag = (element) =>{
    let code = element.value;
    let country = countryList[code];
    let imgLink = `https://flagsapi.com/${country}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = imgLink;
}

const convertCurrency = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if(amountValue === "" || amountValue < 1){
        amountValue = 1;
        amount.value = "1";
    }

    let response = await fetch(URL);
    let exchangeRate = await response.json();

    let fromCurrency = from.value;
    let toCurrency = to.value; 

    let fromCurrencyRate = exchangeRate.conversion_rates[`${fromCurrency}`];
    let toCurrencyRate = exchangeRate.conversion_rates[`${toCurrency}`];

    // console.log(fromCurrencyRate);
    // console.log(toCurrencyRate);

    let fromToUSD = amountValue / fromCurrencyRate;
    let exchangedAmount = (fromToUSD * toCurrencyRate).toFixed(4);

    // console.log(`${amountValue} ${fromCurrency} to ${toCurrency} is ${exchangedAmount} ${toCurrency}`);
    message.innerText = `${amountValue} ${fromCurrency} = ${exchangedAmount} ${toCurrency}`;
}

button.addEventListener("click", (event) => {
    event.preventDefault();
    convertCurrency();
});