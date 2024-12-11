import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Publish } from "./pages/Publish";
import { RecoilRoot } from "recoil";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/publish" element={<Publish />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
            </Routes>
          </Layout>
        </Router>
      </RecoilRoot>
    </>
  );
}
export default App;
