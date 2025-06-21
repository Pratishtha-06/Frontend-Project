import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Head from "./Head";

function AddItems(){
    const [name,setName]=useState('');
    const [type,setType]=useState('');
    const [description,setDescription]=useState('');
    const [coverImg,setCoverImg]=useState('');
    const [additional, setAdditional] = useState('');
    const [additionalPhotos, setAdditionalPhotos] = useState([]);
    const [error,setError]=useState(false);
    const [photo,setPhoto]=useState([]);

    useEffect(()=>{
        const savedPhoto = localStorage.getItem('uploadedPhotos');
        if(savedPhoto){
            setPhoto(JSON.parse(savedPhoto))
        }
    },[]);
    
    const IsInvalid=(!name || !type || !description );
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(IsInvalid){   
        return setError(true);
        }
        const newItem = {
            name,
            type,
            description,
            coverImage: photo,
            additionalImages: additionalPhotos,
        }
            const existingItem = JSON.parse(localStorage.getItem("items")) || [];
            const updatedItems = [...existingItem,newItem];
            localStorage.setItem('items',JSON.stringify(updatedItems));
          setPhoto('');
          alert("Item added successfully");
          navigate('/view-items');
    }

    const handleAddImages =async(e)=>{
        e.preventDefault();
        try{
        const {data :filename} = await  axios.post('https://frontend-project-bdlh.onrender.com/upload-via-link', {link : coverImg})
          setPhoto([filename]);
           localStorage.setItem('uploadedPhotos',JSON.stringify(update));
           console.log("photo array:", photo);

           return update;
          setError(false);
        }catch(err){
            console.log("ERROR",err);
        }
    }

    const handleAddAdditionalImage = async (e) => {
  e.preventDefault();
  if (!additional.trim()) return;

  try {
    const { data: filename } = await axios.post('https://frontend-project-bdlh.onrender.com/upload-via-link', {
      link: additional,
    });

    setAdditionalPhotos((prev) => {
      const updated = [...prev, filename];
      localStorage.setItem('additionalPhotos', JSON.stringify(updated));
      return updated;
    });

    setAdditional('');
  } catch (err) {
    console.error("Error uploading additional image", err);
  }
};


    return (
        <>

        <div  className="d-flex flex-column justify-content-center align-items-center mt-4 w-100">

        <form className="d-flex flex-column w-50 mt-4"
              onSubmit={handleSubmit}>
         <input type="text"
                onChange={(e)=>{setName(e.target.value);
                               setError(false);
                         }}
                value={name}
                placeholder="items name" 
                className="rounded-3 mt-1 mb-1 " style={{border:'1px solid grey'}}/>
         <input type="text" 
                onChange={(e)=>{setType(e.target.value);
                                setError(false);
                         }}
                value={type}
                placeholder="items type. eg-Shirt, Pant, shoes, sports gear." 
                className="rounded-3 mt-1 mb-1" style={{border:'1px solid grey'}}/>
         <textarea type="text" 
                onChange={(e)=>{setDescription(e.target.value)
                                setError(false)  
                         }}
                value={description}
                placeholder="items description" 
                className="rounded-3 mt-1 mb-1" style={{border:'1px solid grey'}}/>
        <div className="w-100">
         <input type="text"  
                onChange={(e)=>setCoverImg(e.target.value)}
                value={coverImg}
                placeholder="add only one cover image" 
                className="rounded-3 mt-1 mb-1" 
                style={{width:'78%',border:'1px solid grey'}}/>


         <button className="bg-danger text-white border border-none ms-1 rounded-3" 
                 style={{width:"20%",height:'31px'}}
                 onClick={handleAddImages}>Add Image</button>       
        </div>
        <div className="d-flex flex-row w-100 h-100">
         { photo.length > 0 && (
            photo.map((link,index)=>(
                <div key={index}>
                    <img src={`https://frontend-project-bdlh.onrender.com/uploads/${link}`} alt="photo"
                         className="rounded-3 m-2"
                         style={{width:'60%'}}></img>
                </div>
            ))
         )}
         </div>
         <div className="w-100">
         <input type="text"  
                onChange={(e)=>setAdditional(e.target.value)}
                value={additional}
                placeholder="items additional images" 
                className="rounded-3 mt-1 mb-1" 
                style={{width:'78%',border:'1px solid grey'}}/>

         <button className="bg-danger text-white border border-none ms-1 rounded-3" 
                 style={{width:"20%",height:'31px'}}
                 onClick={handleAddAdditionalImage}>Add Image</button>        
          </div>  
          <div className="d-flex flex-wrap">
  {additionalPhotos.map((img, idx) => (
    <img
      key={idx}
      src={`https://frontend-project-bdlh.onrender.com/uploads/${img}`}
      alt="additional"
      className="rounded-3 m-2"
      style={{ width: '100px' }}
    />
  ))}
</div>
            { error && (
                <div className="text-danger" style={{fontSize:'small'}}>*All fields are required*</div>
            )}

         <button className="rounded-3 mt-5 mb-1 border border-none text-white bg-danger"
                 style={{height:'35px'}}>Add Item
         </button>
         
         </form>
        </div>
        </>
    )
}
export default AddItems