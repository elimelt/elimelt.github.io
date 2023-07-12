import React from "react";
import quarters from "../../data/academicData.js";
import BlogEntry from "../../components/QuarterEntry/BlogEntry.js";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="page-container">
      {quarters.map((quarter, i) => (
        <div className="quarter" key={i}>
          <BlogEntry quarterData={quarter} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
