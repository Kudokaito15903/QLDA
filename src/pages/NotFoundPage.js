import React from 'react';
import { Link } from 'react-router-dom';


const NotFoundPage = () => {
  return (
    <div className="notfound-container d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div className="error-text display-1">4</div>
        <i className="fas fa-question-circle fa-spin error-icon"></i>
        <div className="error-text display-1">4</div>
        <div className="error-message mt-4">
          <p>
            Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
          </p>
          <p>
            Let's go <strong><Link to={"/"} className="home-link" style={{color:"blue"}}>home</Link></strong> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
