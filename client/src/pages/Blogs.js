import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Button, TextField } from "@mui/material";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${window.location.origin}/api/v1/blog/all-blog`);
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  const [search, setSearch] = useState("");
  const [searchBlog, setSearchBlog] = useState(null);
  const handleSearch = () => {
    const searchData = blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
    setSearchBlog(searchData);
    console.log(searchBlog);
    setSearch("")
  }
  const handleAllBlogs = () => {
    setSearchBlog(null);
  }

  return (
    <div>
      <div style={{margin:'20px', position:'fixed', display:'flex', flexDirection:'column', gap:'10px'}}>
        <TextField variant="outlined" label="Search Blogs" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <Button variant="contained" style={{backgroundColor:'teal'}} onClick={handleSearch}>Search</Button>
        <Button variant="contained" style={{backgroundColor:'teal'}} onClick={handleAllBlogs}>All Blogs</Button>
      </div>
      {
        searchBlog ? searchBlog.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        )) : blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))
      }
      {/* {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))} */}
    </div>
  );
};

export default Blogs;
