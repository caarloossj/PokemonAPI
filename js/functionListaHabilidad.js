function loadJSON()
{
    console.log("Hola");

    demoJS = document.getElementById("demo");
    
    input = document.getElementById('input-buscar-hab');

    input.addEventListener('change',searchHabilidad);

    next = document.getElementById("nextHAB");
    prev = document.getElementById("prevHAB");

    next.addEventListener('click', PaginarMas);
    prev.addEventListener('click', PaginarMenos);
    pagina = 0;

    searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('change', searchHabilidad);

    selectP = document.getElementById("select_P");
    selectP.addEventListener('change',searchHabilidad);

    CargaHabilidad();
}

function processJSONHabilidad()
{

    if((this.readyState == 4) && (this.status == 200))
    {
        habilidad = JSON.parse(this.responseText);

        valor = 1;

        for(var p in habilidad.results)
        {
            habilidad1 = document.createElement('option');
            habilidad1.value = valor;
            valor = valor + 1;
            habilidad1.innerHTML = habilidad.results[p].name;
            selectP.appendChild(habilidad1);
            demoJS.innerHTML += "<br>ABILITY: " + habilidad.results[p].name + "<br>" 
        }
    }
}

function InfoHabilidad()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var infoPokemon = JSON.parse(this.responseText);  

        demoJS.innerHTML =  "<br>NAME: " + infoPokemon.name + "<br>" + "<br>DESCRIPTION: " + infoPokemon.effect_entries[1].effect + "<br>" + "<br>ID ID: " + infoPokemon.id + "<br>" + "<br>GENERATION: " + infoPokemon.generation.name;  
    }
}

function searchHabilidad (e)
{
    console.log('target',e.target.value);
    miPokemon = e.target.value;
    
    if(e.target.value == '')
    {
        demoJS.innerHTML = '';
        CargaHabilidad();
    }
    else
    {
        demoJS.innerHTML = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = InfoHabilidad;
        xmlhttp.open("GET", "https://pokeapi.co/api/v2/ability/"+miPokemon);
        xmlhttp.send();
    }
}

function saveNumHabilidad()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);
        numeroHabilidad = pokemon.count;
    }
}

function CargaHabilidad(numeroHabilidad)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONHabilidad;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/ability/?offset="+pagina+"&limit=16");
    xmlhttp.send();
}

function PaginarMas()
{
    pagina = pagina + 16;
    demoJS.innerHTML = '';
    CargaHabilidad();
}

function PaginarMenos()
{
    if(pagina >= 16)
    {
        pagina = pagina - 16;
        demoJS.innerHTML = '';
        CargaHabilidad();
    }
}

window.addEventListener('load', loadJSON);