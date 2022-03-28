import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Albums from './components/Albums';

function App() {

  const [nameAlbum, setNameAlbum]= useState("");
  const [albumCover, setAlbumCover]= useState("");
  const [artistName, setArtistName]= useState("");
  const [priceAlbum, setPriceAlbum]= useState(0.00);
  const [responseJson, setResponseJson]= useState(null);
  const [search, setSearch]= useState("");

const peticionGet=async()=>{
  let nameSearch=search;
  let searchSeparate=nameSearch.split(" ");
  let innerJoin=searchSeparate.join("+");
  

await axios.get(`https://itunes.apple.com/search?term=${innerJoin}`)
  .then(response=>{
    
    var viewData = JSON.stringify(response.data);
    var resultsJson=JSON.parse(viewData);
        
    resultsJson["results"]=resultsJson["results"].filter((album,i) => album.artistName.toLowerCase() == nameSearch.toLowerCase() && i === resultsJson["results"].findIndex( elem => elem.collectionId === album.collectionId) );
    console.log(resultsJson);

    setResponseJson(resultsJson["results"]);
    setNameAlbum(resultsJson["results"][0].collectionName);
    setAlbumCover(resultsJson["results"][0].artworkUrl100);
    setArtistName(resultsJson["results"][0].artistName);
    setPriceAlbum(resultsJson["results"][0].collectionPrice);
  }).catch(error=>{
    console.log(error);
  })
}

const handleChange=e=>{
  filtrar(e.target.value);
}
const handleKeyDown= (event) => {
  if(event.keyCode === 13) { 
    console.log("teclear enter")
    peticionGet();
  }
}
const filtrar=(terminoBusqueda)=>{
    
}

  return (
    <div className="App">
      <div className="containerInput">
        <input
          className="form-control inputBuscar"
          placeholder="Búsqueda por Nombre"          
          onChange={event => setSearch(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <select name="combo" id="combo">
          <option value="All">All</option>
          <option value="music">music</option>
          <option value="tvShow">tv Show</option>
        </select>

        <button className="btn btn-success"
        onClick={() => peticionGet()}>
          <FontAwesomeIcon icon={faSearch}/>          
        </button>
      </div>

     <div className="table-responsive">
       {responseJson? <Albums albums={responseJson}/>:<h1>cargando...</h1> }
     </div>
    </div>
  );
}

export default App;
