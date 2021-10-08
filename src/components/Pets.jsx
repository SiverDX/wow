import React from "react";
import LazyLoad from 'react-lazyload';

export default class Pets extends React.Component {
    /* todo ::
     on mouseover call wowhead api
    */
    render() {
        return (
            <div>
                <h1>Pets ({this.props.data.pets.length})</h1>
                <div className='image-container'>
                    {this.props.data.pets.map(function (item, index) {
                        let imageSource;

                        if (item.creature_display) {
                            /* some pets are missing this */
                            imageSource = `https://render-eu.worldofwarcraft.com/npcs/zoom/creature-display-${item.creature_display.id}.jpg`;
                        } else {
                            imageSource = 'https://dummyimage.com/600x600/000/fff';
                        }

                        return (
                            <LazyLoad height={600} key={index}>
                                <img src={imageSource} alt={item.species.name} key={index} title={item.species.name}/>
                            </LazyLoad>
                        );
                    })}
                </div>
            </div>
        )
    }
}