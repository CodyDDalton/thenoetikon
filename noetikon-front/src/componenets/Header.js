import Logo from '../images/noetikon_logo.png';
import Refresh from '../images/refresh.png';
import React, { useEffect } from "react";
import axios from 'axios';

const Header = () => {

    const API_BASE = "http://localhost:8000/api/v1";

    //Commit

    useEffect(() => {
        getQuotes();
    }, [])

    const getQuotes = async () => {
        await axios.get(`${API_BASE}/quotes`)
        .then((response) => {
            let quotes = JSON.stringify(response);
            localStorage.setItem("quotes", quotes);
            randomQuote();
        })
    }

    const randomQuote = () => {
        let quotes = JSON.parse(localStorage.getItem("quotes"));
        let max = quotes.data.length;
        let quote = Math.floor(Math.random() * max);
        let generated = quotes.data[quote];
        document.getElementById("featured-quote").innerHTML = '"'+ generated.quote + '"';
        document.getElementById("speaker-tag").innerHTML = "- " + generated.speaker ;
    }

    const switchView = (e) => {
        let input = document.getElementById("input");
        let output = document.getElementById("output");
        if(e.target.id === "input"){
            output.style.backgroundColor = "rgba(185, 148, 128, 0.5)";
            output.style.textDecoration = "none";
            input.style.color = "#3C1C1B";
            input.style.textDecoration = "underline";
            input.style.backgroundColor = "#B99480";
        }
        if(e.target.id === "output"){
            input.style.backgroundColor = "rgba(185, 148, 128, 0.5)";
            input.style.textDecoration = "none";
            output.style.color = "#3C1C1B";
            output.style.textDecoration = "underline";
            output.style.backgroundColor = "#B99480";
        }
    }
    return(
        <div id="Header">
            <div id="feature-div">
                <img id="logo" src={Logo} alt="Noetikon Logo" />
                <p id="featured-quote"><i></i> </p>
                <a id="speaker-link" href="#"><b><p id="speaker-tag"></p></b></a>
            </div>
            <div className="head-tabs">
                <button id="refresh-button" onClick={randomQuote}><img src={Refresh} alt="refresh page" /></button>
                <button id="input" onClick={((e) => switchView(e))}>Input</button>
                <button id="output" onClick={((e) => switchView(e))}>Output</button>
            </div>
        </div>
    )
}

export default Header;