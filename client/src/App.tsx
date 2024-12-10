import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Blog } from "./pages/Blog";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";


function App() {
  return (
    <>
    
      <Router>
        <Routes>
          <Route path="/blogs" element={<Blog/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
