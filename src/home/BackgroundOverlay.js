import React from 'react'
import image1 from './../assets/images/Banner03.jpg';
import './BackgroundOverlay.css'

export default function BackgroundOverlay() {
    return (

        <div className='d-flex mainBg'>
            <div className='bgContainer'>
                <img className='img-fluid  overlayImg' src={image1} alt="" />


               
            </div>
            <div className='bgText'>
                    <h3>OUR <span>TEAM</span> </h3> <br />
                    <h6>We are a team of tech enthusiasts and entertainment lovers dedicated to enhancing your streaming experience.
                         Our developers work tirelessly to keep our platform fast, reliable, and user-friendly,
                          while our content specialists ensure our database is accurate and up-to-date.
                          </h6>
                </div>
        </div>
    )
}
