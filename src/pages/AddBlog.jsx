import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";

const AddBlog = function () {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(title, author, content, tags);
    const newBlog = {
      title: title,
      author: author,
      content: content,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    console.log(newBlog);
    try {
      setIsLoading(true);
      await axios.post("http://localhost:8080/api/v1/blogs", newBlog);
      navigate("/blogs");

      toast("new blog added!!!");
    } catch (error) {
      toast("error creating blog please try again later!!!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="max-w-2xl mx-auto">
      <h1 className=" flex items-center justify-center text-4xl text-gray-800 font bold mb-8 text-center">
        Write a New Blog <SquarePen width={32} height={32} />
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-base font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text "
            id="title"
            name="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent "
            placeholder="Enter your blog title"
            value={title}
            onChange={function (e) {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-base font-medium text-gray-800 mb-2"
          >
            Author
          </label>
          <input
            type="text "
            id="author"
            name="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent "
            placeholder="Your Name(optional)"
            value={author}
            onChange={function (e) {
              setAuthor(e.target.value);
            }}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="Content"
            className="block text-base font-medium text-gray-800 mb-2"
          >
            Content
          </label>
          <textarea
            id="Content"
            name="Content"
            required
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent "
            placeholder="Write Your Content here............................"
            value={content}
            onChange={function (e) {
              setContent(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="Tags"
            className="block text-base font-medium text-gray-800 mb-2"
          >
            Tags
          </label>
          <input
            type="text "
            id="Tags"
            name="Tags"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus-ring to-blue-200 focus:border-transparent "
            placeholder="Enter Tags seperated by commas(e.g., technology , react , programming"
            value={tags}
            onChange={function (e) {
              setTags(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 "
          >
            {isLoading ? "publishing...." : "Publish Blog"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddBlog;
