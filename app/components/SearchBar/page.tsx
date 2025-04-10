import React from "react";
import "./searchBar.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

export default function SearchBar() {
    return (
        <div className="wrapper">
        <div className="search__background">
            <div className="search__wrapper">  
                <figure><img src="logo" alt="" /></figure> 
                <div className="search__content">            
                <div className="search">
                <div className="search__input--wrapper">
                    <input type="text" className="search__input" placeholder="Search here" />
                    <span className="search__icon">
                        <HiMiniMagnifyingGlass />
                    </span>
                </div>
                </div> 
                </div>
            </div>
        </div>
        </div>
    );
}