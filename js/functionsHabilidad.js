function loadJSON()
{
    CargaHabilidad();

    selectHAB = document.getElementById("select_HAB");

    selectHAB.addEventListener('change', DivCargaHabilidad);

    selectP = document.getElementById('select_P');

    selectP.addEventListener('change', InformacionPokemon);

    demoJS = document.getElementById("demo");
}

function processJSONHabilidad()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var habilidad = JSON.parse(this.responseText);

        for(var t in habilidad.results)
        {
            habilidad1 = document.createElement('option');
            habilidad1.value = t;
            habilidad1.innerHTML = habilidad.results[t].name;
            selectHAB.appendChild(habilidad1);
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

function divHabilidad()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var pokemon = JSON.parse(this.responseText);
        
        demoJS.innerHTML = '';
        selectP.innerHTML = '';
        
        for (var habilidad  in pokemon.pokemon)
        {
            pokemon1 = document.createElement('option');
            pokemon1.value = habilidad;
            pokemon1.innerHTML =  pokemon.pokemon[habilidad].pokemon.name;
            selectP.appendChild(pokemon1);
        }
    }
}

function CargaHabilidad()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONHabilidad;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/ability/");
    xmlhttp.send();
}

function DivCargaHabilidad()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = divHabilidad;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/type/"+selectHAB.selectedIndex+"/"+"");
    xmlhttp.send();
    console.log(selectHAB.selectedIndex);
}

function InformacionPokemon()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = ShowPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+selectP.options[selectP.selectedIndex].innerHTML);
    xmlhttp.send();
}
