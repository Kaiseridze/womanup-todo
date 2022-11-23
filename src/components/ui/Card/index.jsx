import React from "react";
import "./Card.style.less";

/**
 * @component Card
 * @param {object} props Object of Props
 * @param {React.ReactNode | React.ReactNode[]} props.children Accepts HTML elements
 * @param {string} props.title Accepts a title of card
 * @param {string} props.className Accepts a className (class) for more comfortable handling on the page
 * @returns Card as Component
 */
const Card = ({ children, title, className = "card" }) => {
  return (
    <div className={`${className}`}>
      {title && <h1 className={`${className}__title`}>{title}</h1>}
      <div className={`${className}__body`}>{children}</div>
    </div>
  );
};

export default Card;
