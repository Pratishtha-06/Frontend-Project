import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

function Head(){
    return (
        <>
        <div className="bg-light w-100 text-center p-3">
            <h3>Add Items/View Itmes</h3>
            <Link to={'/'} className="Link m-3 ">Add Items</Link>
            <Link to={'/view-items'} className="Link m-3">View-Items</Link>
        </div>
        </>
    )
}
export default Head;