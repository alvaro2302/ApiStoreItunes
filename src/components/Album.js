import React from "react";

class Album extends React.Component{
    render(){
        return (
            <div>
                <img src={this.props.cover}/>
                <h1>{this.props.nameAlbum}</h1>
                <p>{this.props.artistName}</p>
                <h2>{this.props.price}</h2>
            </div>   
        )

    }
};

export default Album;
