function loadJSON()
{
    CargaNumeroPokemon();

    selectLP = document.getElementById("select_P");

    selectT = document.getElementById("select_T");

    selectLP.addEventListener('change', InfoPokemon);

    demoJS = document.getElementById("demo");
}

//ME MUESTRA EN EL DIV SEGÚN EL POKEMON SELECCIONADO
function ShowPokemon()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);
        demoJS.innerHTML = '';
        selectT.innerHTML = '';
        pintarListaTipo(pokemon);

    }
}
function pintarListaTipo(pokemon)
{
    for (var tipo in pokemon.types)
    {
        tipo1 = document.createElement('option');
        tipo1.value = tipo;
        tipo1.innerHTML = pokemon.types[tipo].type.name;
        selectT.appendChild(tipo1);
        demoJS.innerHTML =  "<br>WEIGHT: " + pokemon.weight + "<br>" + "<br>HEIGHT: " + pokemon.height + "<br>"+ "<br>ID: " + pokemon.id + "<br>"+ "<br>BASE EXPERIENCE: " + pokemon.base_experience;
    }

    if(!pokemon.sprites.front_default)
    {
        demoJS.innerHTML += "<img class = 'imagenesX'src = ../imagenes/X.png >";
    }
    else
    {
        demoJS.innerHTML += "<img class = 'imagenesPok' src =" +pokemon.sprites.front_default+">";
    }
}

//ME CARGA LOS POKEMONS EN EL SELECT
function processJSONPokemon()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);

        console.log(pokemon.count);
        for(var p in pokemon.results)
        {
            pokemon1 = document.createElement('option');
            pokemon1.value = p;
            pokemon1.innerHTML = pokemon.results[p].name;
            selectLP.appendChild(pokemon1);
        }
    }
}

function saveNumPokemon()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);
        numeroPokemon = pokemon.count;
        CargaPokemon();
    }
}

function CargaNumeroPokemon()
{
    //resetP();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = saveNumPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon");
    xmlhttp.send();
}

function InfoPokemon()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ShowPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+selectLP.options[selectLP.selectedIndex].innerHTML+"");
    xmlhttp.send();
}

function CargaPokemon()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?offset=0&limit="+numeroPokemon);
    xmlhttp.send();
}