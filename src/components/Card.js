import React from "react";

const Card = () => {
  return (
    <div>
      <div className="container mt-3">
        <h2>Card Ima</h2>
        <p>Image at th (card-img-top):</p>
        <div className="card">
          <img
            className="card-img-top"
            src="../images/benz.jfif"
            alt="Card image"
            
          />
          <div className="card-body">
            <h4 className="card-title">John Doe</h4>
            <p className="card-text">
              Some example text some example text. John Doe is an architect and
              engineer
            </p>
            <a href="#" className="btn btn-primary">
              See Profile
            </a>
          </div>
        </div>
        <br />
      </div>
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" className="btn btn-primary">
            Button
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
