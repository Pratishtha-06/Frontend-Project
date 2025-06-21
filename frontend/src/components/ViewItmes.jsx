import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewItems(){
    const [items,setItems]=useState([]);

     const defaultItems = [
    {
      name: "T-Shirt",
      coverImage: "Grey_Tshirt.jpg",
      index:'0'
    },
    {
      name: "Sneakers",
      coverImage: "Shoe.jpg", // Same here
    },
    {
      name: "Pants",
      coverImage: "pants.jpeg", // Same here
    },{
      name: "Studs Football",
      coverImage: "images.jpeg", // Same here
    }
    ];

    useEffect(()=>{
        const getItems = JSON.parse(localStorage.getItem("items")) || [];
        const allItems = [...defaultItems, ...getItems];
        setItems(allItems);
    },[])

    return(
        <>
        <h5 className="text-center m-4">Welcome to view page</h5> 
       
       <div className="row">
         {items.length > 0 && items.map((item,index)=>(
             <Link to={`/view-item/${index}`} key={index} className="text-black col-lg-4 col-md-6">
            <div  
                 className="rounded-3 ms-3 mb-4 d-flex flex-column justify-content-center align-items-center" 
                 style={{width:'300px',height:'320px', border:'1px solid grey'}}>
             <div style={{width:'100%',height:'230px'}}>
            <img src={`https://frontend-project-bdlh.onrender.com/uploads/${item.coverImage}`} 
                 style={{width:'inherit',height:'inherit' ,marginTop:'5px'}}>
            </img>
            </div>
            <div className="mt-3 w-100" style={{textAlign:"center",borderTop:'1px solid grey'}}>
            <h5 className="p-2">{item.name}</h5>
            </div>
            </div>
             </Link>
         ))
         }
     
        </div>
        </>
    )
}
export default ViewItems;