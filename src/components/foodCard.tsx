import React from "react";

function FoodCard({ food, index }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3 mb-3" id={index}>
      <div className="card">
        <div className="card-header text-center font-weight-bold">
          <span>{food.name}</span>
        </div>
        <div className="card-body p-0">
          <img
            src={food.image}
            alt={food.name}
            className="w-100"
            style={{ width: "100px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
