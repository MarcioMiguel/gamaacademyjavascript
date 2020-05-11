const url = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let cards = document.querySelector("#cards");
let btn = document.querySelector("#btn");

let arrayCards = [];

var minhapromisses = function () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send(null);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }else{
                    reject('Erro na requisição');
                }
            }
        }
    });
}

minhapromisses()
.then(function(response){
    arrayCards = response;
    console.log(response);
    cardsAlimenta(response);

})
.catch(function(error){
    console.warn(error);
});

function cardsAlimenta(response) {
    response.map(function(card) {
        cards.innerHTML += ` 
        <div class="card rounded-0" style="margin: 1rem;">
            <a href="#">
                <img class="card-img-top" src="${card.photo}" alt="Card image cap">
            </a>
            <div class="card-body">
                <h5 class="card-title">"${card.name}"</h5>
                <p class="card-text">${card.property_type}</p>
                <a id="valor" class="float-right">R$${moeda(card.price)} / noite</a>
            </div>
        </div>
        `;            

        if(!btn.innerHTML.includes(card.property_type)){        
            btn.innerHTML += ` 
            <button class="btn btn-primary m-2" onclick="filtrar('${card.property_type}')">
            ${card.property_type}
            </button>
        `
        };
    } );
}

function filtrar(lugar) {
    let filtrados = []
    if(lugar === 'Todos') {
        filtrados =  arrayCards;   
    }else {
        filtrados = arrayCards.filter(function(item) {
            return item.property_type === lugar
        });
    }   
    cards.innerHTML = ``
    cardsAlimenta(filtrados);
}

function moeda(num) {
    x = 0;
  
    if(num<0) {
       num = Math.abs(num);
       x = 1;
    }
    if(isNaN(num)) num = "0";
       cents = Math.floor((num*100+0.5)%100);
  
    num = Math.floor((num*100+0.5)/100).toString();
  
    if(cents < 10) cents = "0" + cents;
       for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
          num = num.substring(0,num.length-(4*i+3))+'.'
                +num.substring(num.length-(4*i+3));
    ret = num + ',' + cents;
    if (x == 1) ret = ' - ' + ret; return ret;
  
 }