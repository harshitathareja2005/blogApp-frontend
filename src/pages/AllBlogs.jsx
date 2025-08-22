import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";
import { Link } from "react-router";

const AllBlogs = function () {
  const [AllBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchAllBlogs() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/blogs");
        setAllBlogs(response.data);
      } catch (error) {
        toast.error("error fetching blogs");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllBlogs();
  }, []);

  return (
    <main>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Blogs</h1>
        <p className="text-gray-600 mb-6">Explore all the amazing stories!!</p>
      </div>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      ) : AllBlogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {AllBlogs.map(function (blog) {
            return <BlogCard key={blog._id} blog={blog} />;
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No blogs available</p>
          <Link
            to="/add-blogs"
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Write the first blog!!
          </Link>
        </div>
      )}
    </main>
  );
};

export default AllBlogs;
