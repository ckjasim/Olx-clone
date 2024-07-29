import React, { Fragment, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref,getDownloadURL, uploadBytes } from 'firebase/storage';
import {useNavigate} from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {

  const [productName, setName]=useState('')
  const [category, setCategory]=useState('')
  const [price, setPrice]=useState('')
  const [image, setImage]=useState('')
  const [userId,setUserId]=useState('')
  const navigate=useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth,async (user)=>{
      setUserId(user.uid)
    })
  })

  const productUpload = async ()=>{
    try {
      const storageRef = ref(storage,'image/'+image.name)
      await uploadBytes(storageRef,image)
      const url = await getDownloadURL(storageRef)
      const date = new Date()
      await addDoc(collection(db,'products'),{
        name,category,price,imageurl:url,
        createdAt:date.toString(),
        userId
      })
      setName('')
        setCategory('')
        setPrice('')
navigate('/')
        
    } catch (error) {
      console.log(error.message)
      alert(error.message)
    }
  }
  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <form>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              value={productName}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="Category"
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input className="input" type="number" id="price" name="Price"    value={price}
              onChange={(e)=>setPrice(e.target.value)}/>
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''} />
          <form>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} accept='image/*' type="file" />
            <br />
            <button className="uploadBtn" onClick={(e)=>{e.preventDefault();productUpload()}}>Upload and Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
