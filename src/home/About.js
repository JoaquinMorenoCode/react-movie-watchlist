import React from 'react';
import image1 from './../assets/images/Banner02.jpg';

import './About.css';

export default function About() {
    return (
        <div className='mainAbout' id='AboutSection'>
            <div className='d-flex justify-content-center '>
                <div className='About'>
                    <h1>ABOUT <span>US</span> </h1>
                    <section>
                       Welcome to StreamNow, your ultimate destination for discovering where your favorite movies and TV shows are streaming. Whether you're looking to binge-watch the latest series or find a classic film, StreamNow makes it easy to locate the streaming service you need.

                        <br /><br />
                        <h2>OUR <span>MISSION</span> </h2>
                        At StreamNow, our mission is to simplify the streaming experience. In a world with countless streaming platforms, it can be challenging to keep track of where content is available. We aim to eliminate the frustration and save you time by providing a one-stop solution for all your streaming needs.
                        <br /><br />
                        
                    </section>
                </div>

                <div className='AboutImage'>
                    <img src={image1} alt="" />
                </div>

            </div>

        </div>





    )
}
