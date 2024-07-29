import React, { useContext } from 'react';

import './View.css';
import { PostContext } from '../../context/postContext';
function View() {
  const {productdetails} =useContext(PostContext)
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productdetails.imageurl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>{productdetails.price} </p>
          <span>{productdetails.name}</span>
          <p>{productdetails.category}</p>
          <span>{new Date(productdetails.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>No name</p>
          <p>1234567890</p>
        </div>
      </div>
    </div>
  );
}
export default View;
