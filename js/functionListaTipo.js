function loadJSON()
{
    CargaTipo();

    console.log("Hola");

    searchButton = document.getElementById("searchButton")

    demoJS = document.getElementById("demo");
    
    selectP = document.getElementById("select_P");
    selectP.addEventListener('change',searchTipo);

    input = document.getElementById('input-buscar-tipo');

    searchButton.addEventListener('change', searchTipo);


    input.addEventListener('change',searchTipo);
}

function processJSONTipo()
{

    if((this.readyState == 4) && (this.status == 200))
    {
        tipo = JSON.parse(this.responseText);

        valor = 1;

        for(var p in tipo.results)
        {
            tipo1 = document.createElement('option');
            tipo1.value = valor;
            valor = valor + 1;
            tipo1.innerHTML = tipo.results[p].name;
            selectP.appendChild(tipo1);

            demoJS.innerHTML += "<br>TYPE: " + tipo.results[p].name + "<br>"
        }
    }
}

function InfoHabilidad()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var infoTipo = JSON.parse(this.responseText); 

        demoJS.innerHTML +=  "<br>NAME: " + infoTipo.name + "<br>";

        for(var effect in infoTipo.damage_relations.double_damage_from)
        {
            demoJS.innerHTML += "<br>DOUBLE DAMAGE: " + infoTipo.damage_relations.double_damage_from[effect].name + "<br>" 
        }

        for(var effect1 in infoTipo.damage_relations.half_damage_to)
        {
            demoJS.innerHTML += "<br>EFFECTIVE: " + infoTipo.damage_relations.half_damage_to[effect1].name + "<br>"  
        }

        for(var effect2 in infoTipo.damage_relations.no_damage_from)
        {
            demoJS.innerHTML += "<br>NO DAMAGE FROM: " + infoTipo.damage_relations.no_damage_from[effect2].name + "<br>"
        }

        for(var effect3 in infoTipo.damage_relations.no_damage_to)
        {
            demoJS.innerHTML += "<br>NO DAMAGE TO: " + infoTipo.damage_relations.no_damage_to[effect3].name + "<br>"
        }
    }
}

function CargaTipo()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONTipo;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/type/");
    xmlhttp.send();
}

function searchTipo (e)
{
    console.log('target',e.target.value);
    miPokemon = e.target.value;
    
    if(e.target.value == '')
    {
        console.log("hola");
        demoJS.innerHTML = '';
        CargaTipo();
    }
    else
    {
        demoJS.innerHTML = '';
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = InfoHabilidad;
        xmlhttp.open("GET", "https://pokeapi.co/api/v2/type/"+miPokemon);
        xmlhttp.send();
    }
}

window.addEventListener('load', loadJSON);