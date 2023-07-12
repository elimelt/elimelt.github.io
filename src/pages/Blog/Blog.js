import React from "react";
import entries from "../../data/blogData.js";
import BlogEntry from "../../components/BlogEntry/BlogEntry.js";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="page-container">
      {entries.map((entry, i) => (
        <div className="entry" key={i}>
          <BlogEntry blogData={entry} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
