import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import './Post.css';
import { PostContext } from '../../context/postContext';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([]);
  const { setProductDetails } = useContext(PostContext);
  const navigate = useNavigate();

  const handleClick = (product) => {
    try {
      setProductDetails(product);
      navigate(`/view/${product.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const addProduct = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productData);
      } catch (error) {
        alert(error.message);
      }
    };
    addProduct();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div className="card" onClick={() => handleClick(product)} key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageurl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="YAMAHA R15V3" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
