import React from "react";
import "./Checkbox.style.less";

/**
 *
 * @param {object} props Object of props
 * @param {function} props.onChange - Change state of checkbox (active / inactive)
 * @param {boolean} props.checked - Current state of checkbox (active / inactive)
 * @returns Checkbox as Component
 * @example
 * const checked = false
 * const onChangeState = () => !checked
 * return (
 * <input onChange={onChangeState} checked={false}/>
 * )
 */
const Checkbox = ({ onChange, checked }) => {
  return (
    <input
      aria-label="checkbox"
      type="checkbox"
      onChange={onChange}
      checked={checked}
      className="checkbox"
    />
  );
};

export default Checkbox;
