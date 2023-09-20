function loadJSON()
{
    CargaTipo();

    selectT = document.getElementById("select_T");

    selectT.addEventListener('change', DivCargaTipo);

    selectP = document.getElementById("select_P");

    selectP.addEventListener('change', InformacionPokemon);
    
    demoJS = document.getElementById("demo");
}

function processJSONTipo(pokemon)
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var tipo = JSON.parse(this.responseText);

        for(var t in tipo.results)
        {
            tipo1 = document.createElement('option');
            tipo1.value = t;
            tipo1.innerHTML = tipo.results[t].name;
            selectT.appendChild(tipo1);
        }
    }
}

function divTipo()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);
        
        demoJS.innerHTML = '';
        selectP.innerHTML = '';

        for (var tipo in pokemon.pokemon)
        {
            pokemon1 = document.createElement('option');
            pokemon1.value = tipo;
            pokemon1.innerHTML =  pokemon.pokemon[tipo].pokemon.name;
            selectP.appendChild(pokemon1);
        }
    }
}

function ShowPokemon()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        demoJS.innerHTML = '';

        var pokemon = JSON.parse(this.responseText);

        demoJS.innerHTML =  "<br>WEIGHT: " + pokemon.weight + "<br>" + "<br>HEIGHT: " + pokemon.height + "<br>"+ "<br>ID: " + pokemon.id + "<br>"+ "<br>BASE EXPERIENCE: " + pokemon.base_experience;

        demoJS.innerHTML += "<img class = 'imagenesPok' src =" +pokemon.sprites.front_default+">";            
    }
}


function CargaTipo()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONTipo;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/type/");
    xmlhttp.send();
}

function DivCargaTipo()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = divTipo;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/type/"+selectT.selectedIndex+"/"+"");
    xmlhttp.send();
    console.log(selectT.selectedIndex);
}

function InformacionPokemon()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ShowPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+selectP.options[selectP.selectedIndex].innerHTML);
    xmlhttp.send();
}