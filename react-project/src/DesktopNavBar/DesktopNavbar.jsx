import React from "react";
import './DesktopNavBar.css'

import facebookLogo from '../img/facebook-icon.svg'
import logoutLogo from '../img/sign-out-alt-solid.svg'
import instagramLogo from '../img/instagram-icon.svg'
import twitterLogo from '../img/twitter-icon.svg'


const DesktopNavBar =() => {
    return (
        <div className="Desktop-nav-bar">
            <div className="DesktopSignOut">
                <div>
                    <a href="＃"><img src={logoutLogo} /></a>
                </div>
            </div>
            <div className="about-me">
                <div className="facebook">
                    <a href="https://www.facebook.com/" target="_blank"><img src={facebookLogo} /></a>
                </div>
                <div className="instagram">
                    <a href="https://www.instagram.com/" target="_blank"><img src={instagramLogo} /></a>
                </div>
                <div className="twitter">
                    <a href="https://twitter.com/" target="_blank"><img src={twitterLogo} /></a>
                </div>
            </div>
        </div>
        )
}

export default DesktopNavBar;