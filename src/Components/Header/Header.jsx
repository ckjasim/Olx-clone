import React from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { logout } from "../../firebase";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Search by place..." />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        {/* <div className="loginPage">
          <span>Login</span>
          <hr />
        </div> */}
        <div className="logout">
          <span onClick={logout}>Logout</span>
        </div>
        <Link to={'/create'}>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
