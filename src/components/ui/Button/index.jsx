import React from "react";

import "./Button.style.less";

/**
 * @component Button
 * @param {Object} props - Object of props.
 * @param {React.ReactNode | React.ReactNode[]} props.children - Accepts the text or HTML tags
 * @param {function} props.onClick - Accepts the function that will be works on click into the button.
 * @returns {HTMLButtonElement} Button as Component
 * @example
 * const children = "add"
 * const onAlert = () => alert(123)
 * return (
 *  <button onClick={onAlert}>add</button>
 * )
 */
const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
