import React from 'react';
import { Link } from 'react-router-dom';

import './Item.css';

const Item = (props) => {
  return (
    <>
      <Link className="item" to={`/items/detail/${props.itemId}`}>
        <img className="item-image" src={props.imgURL} alt={props.name} />
        <div className="item-name">{props.name}</div>
        <div className="onhand-qty-header">On Hand Quantity</div>
        <div className="onhand-qty">{props.onHandQty}</div>
        <div className="preferred-qty">{props.preferredQty}</div>
      </Link>
    </>
  );
};

export default Item;
