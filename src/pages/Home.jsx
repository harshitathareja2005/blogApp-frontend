import { useState, useEffect } from "react";

import BlogCard from "../components/BlogCard";
import { Link } from "react-router";
import axios from "axios";
const HomePage = function () {
  const [recentBlogs, setRecentblogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchRecentBlogs() {
      try {
        const response = await axios.get(
          "https://blogapp-1-m4gi.onrender.com/api/v1/blogs"
        );
        setRecentblogs(response.data.slice(0, 3));
      } catch (error) {
        console.log(error);

        toast.error("error fetching recent blogs");
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecentBlogs();
  }, []);
  return (
    <main>
      {/* hero section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to BlogPage
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          iusto? Sapiente sequi vel facere expedita mollitia tenetur cum aut?
          Aliquid magni facere tempore consequatur necessitatibus ducimus, ipsum
          nisi iusto culpa.
        </p>
      </section>
      {/* recentBlogssection */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Recent Blogs
        </h2>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : recentBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentBlogs.map(function (blog) {
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
        {recentBlogs.length > 0 && (
          <div className="text-center">
            <Link
              to={"/blogs"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              View all blogs
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;
