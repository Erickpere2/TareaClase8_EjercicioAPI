//Guardamos los generos en el combobox
const generos=()=>{
  const api2=`https://api.themoviedb.org/3/genre/movie/list?api_key=9b2a8312890d22034abbef2a8b6caac7&language=es-MX`

   fetch(api2).then((response)=>{
    if(response.status!==200){
console.log(`Hay un problemita ${response.status}`);
return;
    }
    
    response.json().then((data)=>{
      imprimirHTML(data.genres);
    })
  })
}
function imprimirHTML(genero){
  let combobox='';
  genero.forEach(gener=>{
      combobox+=`<option value="${gener.name}">${gener.name}</option>`
  });
  console.log(combobox);
  const contenedor2=document.querySelector('#combo');
  contenedor2.innerHTML=combobox;
}
generos();



//Metodo que se ejecuta al seleccionar categoria en combobox
function Obtener(){
//Metodo con fetch para recorrer el api
const IDgeneros=(ID)=>{
  const api2=`https://api.themoviedb.org/3/genre/movie/list?api_key=9b2a8312890d22034abbef2a8b6caac7&language=es-MX`

   fetch(api2).then((response)=>{
    if(response.status!==200){
console.log(`Hay un problemita ${response.status}`);
return;
    }
    
    response.json().then((data)=>{
  ObtenerID(ID, data.genres);

      
    })
    
  })
}
//Funcion para devolver el id del genero
function ObtenerID(palabra, arreglo){
  var id=0;
  arreglo.forEach(gen=>{
    if(palabra===gen.name){
      id= gen.id;
    }
    
});
console.log(id);

//Desplesgamos peliculas segun categoria con ajax
const ObtenerPeliculas = new Promise((resolve, reject) => {
  const api = `https://api.themoviedb.org/3/movie/upcoming?api_key=9b2a8312890d22034abbef2a8b6caac7&language=es-MXhttps://api.themoviedb.org/3/movie/upcoming?api_key=9b2a8312890d22034abbef2a8b6caac7&language=es-MX`;
  const xhr = new XMLHttpRequest();

  xhr.open("GET", api, true);

  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.responseText).results);
    } else {
      reject(Error(xhr.statusText).header);
    }
  };

  xhr.onerror = (error) => reject(error);

  xhr.send();
});

ObtenerPeliculas.then(
  (pelicula) => html(pelicula),
  (error) => console.error(new Error("Hubo un clavo" + error))
);
 function html(movies){
    let obhtml='';
    movies.forEach(element => {
      element.genre_ids.forEach(element2=>{
        if(element2===id){
          obhtml+=`<img src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2${element.poster_path}"></img><br>Titulo: ${element.title}<br>Titulo Original: ${element.original_title}<br> Fecha de Lanzamiento: ${element.release_date}<br>`
        }
      });
       
    });
    const contenedor=document.querySelector("#app");
    contenedor.innerHTML=obhtml;
    console.log(obhtml);
}
}
let categoria=document.getElementById("combo");
let categoriaSeleccionada=categoria.value;
console.log(categoria);
IDgeneros(categoriaSeleccionada);

}
