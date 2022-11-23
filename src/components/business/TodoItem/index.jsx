import React, { useEffect, useState } from "react";
import { Checkbox } from "../../../components";
import {
  openInNewTab,
  expiresInterval,
  formatDateFromSeconds,
} from "../../../utils";
import "./TodoItem.style.less";

import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Link } from "react-router-dom";

/**
 * This is a business component. It performs a specific task in the context of business logic. This component is based on other UI components
 * @component TodoItem
 * @param {object} props - Object of props
 * @param {string} props.title - Accepts title of TodoItem
 * @param {text} props.text - Accepts text of TodoItem
 * @param {function} props.onChange - Accepts function for Checkbox Component
 * @param {function} props.onClick - Accepts function for BsFillTrashFill Component
 * @param {function} props.onLink - Accepts function(route) for Link component. This is necessary to go to the route of a specific task.
 * @param {function} props.fileUrl - AN optional prop, that provide link on attachment
 * @param {number} props.expires - An optional prop that contains the expiration date in seconds
 */
const TodoItem = React.memo(
  ({ title, text, checked, onChange, onClick, onLink, fileUrl, expires }) => {
    const [isExpired, setIsExpired] = useState(false); // State of expire
    
    const stopExpiring = expires && !checked; // Status of the visual effect when the task is not completed

    // Initialize interval if expiration date exists
    useEffect(() => {
      expiresInterval(expires, setIsExpired);
      return () => clearInterval(expiresInterval);
    }, []);

    return (
      <li
        className={`todo-item ${isExpired ? "expired" : ""} ${
          checked ? "checked" : ""
        }`}
      >
        <div className="todo-item__main">
          <h2 className="todo-item__title">{title}</h2>
          <p className="todo-item__text">{text}</p>
          {stopExpiring && (
            <span className="todo-item__expiring">
              {isExpired ? "Task expired at " : "Task expires on "}
              {formatDateFromSeconds(expires)}
            </span>
          )}
          {fileUrl && (
            <span
              className="todo-item__ref"
              onClick={() => openInNewTab(fileUrl)}
            >
              Open attachment
            </span>
          )}
        </div>
        <div className="todo-item__footer">
          <Checkbox onChange={onChange} checked={checked} />
          <div className="todo-item__toggles">
            <BsFillTrashFill
              aria-label="remove"
              onClick={onClick}
              className="todo-item__icon"
              size="30"
            />
            <Link to={onLink}>
              <AiFillEdit
                aria-label="edit"
                className="todo-item__icon"
                size="30"
              />
            </Link>
          </div>
        </div>
      </li>
    );
  }
);
export default TodoItem;
