import React from 'react';
import Album from './Album';
import NotFound from './NotFound';
class Albums extends React.Component{

    render() {
        const albums = this.props.albums;
     
      return (
        <div>
            {
              albums.length != 0 ?
              albums.map((album,i)=>(
                <Album key ={i} cover={album["artworkUrl100"]} nameAlbum={album.collectionName} artistName={album.artistName} price={album.collectionPrice}/>

              ))
              :
              <NotFound/>
            }
        </div>
      )
    };
}

export default Albums;


