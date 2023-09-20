function loadJSON()
{
    demoJS = document.getElementById("demo");
    imagePoke = document.getElementById("imgPoke");

    input = document.getElementById('input-buscar-pkm');
    input.addEventListener('change',searchPokemon);

    searchButton = document.getElementById("searchButton");
    searchButton.addEventListener('change', searchPokemon);
    
    next = document.getElementById("next");
    prev = document.getElementById("prev");

    next.addEventListener('click', PaginarMas);
    prev.addEventListener('click', PaginarMenos);

    selectP = document.getElementById("select_P");

    selectP.addEventListener('change',searchPokemon);

    pagina = 0;
    CargaPokemon();
}

function processJSONPokemon()
{

    if((this.readyState == 4) && (this.status == 200))
    {
        pokemon = JSON.parse(this.responseText);

        valor = 1;

        for(var p in pokemon.results)
        {
            pokemon1 = document.createElement('option');
            pokemon1.value = valor;
            valor = valor + 1;
            pokemon1.innerHTML = pokemon.results[p].name;
            selectP.appendChild(pokemon1);

            demoJS.innerHTML += "<br><br>POKEMON: " + pokemon.results[p].name + "<br/><br/><br/>";

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = showImage;
            xmlhttp.open("GET", pokemon.results[p].url);
            xmlhttp.send();
        }
    }
}

function CargaPokemon()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = processJSONPokemon;
    xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?offset="+pagina+"&limit=7");
    xmlhttp.send();
}

function searchPokemon (e)
{
    miPokemon = e.target.value;
    
    if(e.target.value == '')
    {
        imagePoke.innerHTML = '';
        demoJS.innerHTML = '';
        CargaPokemon();
    }
    else
    {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = InfoPokemon;
        xmlhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/"+miPokemon);
        xmlhttp.send();
    }
}

function showImage()
{
    if((this.readyState == 4) && (this.status == 200))
    {
       
        var pokemon = JSON.parse(this.responseText);      
                                  
        imagePoke.innerHTML += "<img class = 'ImagenEvoPokemon' src=" + pokemon.sprites.front_default+" />";
    }
}

function InfoPokemon()
{
    if((this.readyState == 4) && (this.status == 200))
    {
        var infoPokemon = JSON.parse(this.responseText);

        demoJS.innerHTML =  "<br>NAME: " + infoPokemon.name + "<br>" + "<br>HEIGHT: " + infoPokemon.height + "<br>" + "<br>POKEDEX ID: " + infoPokemon.id + "<br>";
        imagePoke.innerHTML = '';
        showImage();
        imagePoke.innerHTML += "<img class = 'ImagenEvoPokemon' src=" + infoPokemon.sprites.front_default+" />";
    }
}

function PaginarMas()
{
    pagina = pagina + 7;
    imagePoke.innerHTML = '';
    demoJS.innerHTML = '';
    CargaPokemon();
}

function PaginarMenos()
{
    if(pagina >= 7)
    {
        pagina = pagina - 7;
        imagePoke.innerHTML = '';
        demoJS.innerHTML = '';
        CargaPokemon();
    }
}