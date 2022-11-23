import { Container } from "./components";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import AddTodo from "./pages/AddTodo";
const App = () => {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_todo" element={<AddTodo />} />
          <Route path="/edit_todo/:id" element={<AddTodo />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
