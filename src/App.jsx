import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import AllBlogs from "./pages/AllBlogs";
import AddBlog from "./pages/AddBlog";
import SingleBlog from "./pages/SingleBlog";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 ">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/blogs" element={<AllBlogs />}></Route>
            <Route path="/add-blog" element={<AddBlog />}></Route>
            <Route path="/blog/:id" element={<SingleBlog />}></Route>
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
};
export default App;
