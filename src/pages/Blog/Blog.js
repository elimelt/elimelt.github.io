import React from "react";
import entries from "../../data/blogData.js";
import BlogEntry from "../../components/BlogEntry/BlogEntry.js";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="page-container">
      {entries.map((entry, i) => (
        <BlogEntry blogData={entry} key={i}/>
        
      ))}
    </div>
  );
};

export default Blog;
