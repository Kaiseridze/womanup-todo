import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getData, updateStatus, deleteData } from "../../api";
import { Card, Button, Loader, TodoItem } from "../../components";

/**
 * Homepage
 * @returns Home as Component
 */
const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const [data, setData] = useState([]); // Array of todos
  const [isLoading, setIsLoading] = useState(true); // Loading status

  // Route to create new task
  const onClickAdd = () => {
    navigate("/add_todo");
  };

  /* Fetching data from db. 
    #Note: To set loading status into db is not the best way.
    But i don't get how to wrap snapshot in async/await
  */
  useEffect(() => {
    getData(setData, setIsLoading);
  }, []);

  return (
    <div className="home">
      <Card title="WomanUP To Do">
        <Button onClick={onClickAdd}>Add</Button>
        <ul className="todo">
          {isLoading && <Loader />}
          {data.map((item) => (
            <TodoItem
              expires={item?.expiration?.seconds}
              onChange={() => updateStatus(item)}
              onClick={() => deleteData(item.id)}
              onLink={`/edit_todo/${item.id}`}
              key={item.id}
              text={item.text}
              title={item.title}
              checked={item.checked}
              fileUrl={item.fileUrl}
            />
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Home;
