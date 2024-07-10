import React, { useState } from 'react';
import './video.css'
import "../favorite/favorite-button.scss";
const ButtonWithIframe = (props) => {
    const [showIframe, setShowIframe] = useState(false);
    
    const handleButtonClick = () => {
        setShowIframe(true);
    };

    const closeIframe = () => {
        setShowIframe(false);
    }

    const item = props.id;
    
    return (
        <div>
            <button style={{marginLeft:"15px"}} type="button" className="btn btn-outline-danger" onClick={handleButtonClick}> Play Movie </button>
            {showIframe && (
                <div className="iframe-overlay">
                    <iframe id="myIframe" width="1000" height="700" src={`https://vidsrc.to/embed/movie/${item}`} style={{ marginLeft: "17rem", border: "2px solid black" }} frameborder="0" allow="autoplay" allowfullscreen="true"></iframe>
                    <button style={{position:"absolute", top:"55px"}} type="button" className="btn btn-outline-danger" onClick={closeIframe}><i className="bi bi-x-circle-fill"></i></button>
                </div>
            )}
        </div>
    );
};

export default ButtonWithIframe;
