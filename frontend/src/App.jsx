import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
      </Routes>
    </>
  );
}

export default App;
