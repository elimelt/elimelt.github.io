import React from "react";
import entries from "../../data/blogData.js";
import BlogEntry from "../../components/BlogEntry/BlogEntry.js";
import "./Blog.css";
import CollectionView from "../../components/CollectionView/CollectionView.js";

const Blog = () => {
  const [entryModal, setEntryModal] = React.useState(entries[0].name);
  const [collapsed, setCollapsed] = React.useState(true);

  const showEntryModal = entryName => {
    setEntryModal(entryName);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }
  console.log('blog entries')

  return (
    <div className="page-container">
      <div className="entry-container">
      {collapsed ? (
        <>
        <CollectionView
          collection={ entries.slice(0, 3).map(entry => entry.name) }
          classNames={{}}
          clickHandler={showEntryModal}
        />
        <span onClick={toggleCollapsed} style={{ cursor: "pointer", fontSize: '40px'}}>...</span>
        </>
       ) : (
        <>
        <CollectionView
          collection={ entries.map(entry => entry.name) }
          classNames={{}}
          clickHandler={showEntryModal}
        />
        <span onClick={toggleCollapsed} style={{ cursor: "pointer", fontSize: '40px'}}>{"..."}</span>
        </>
        )}
        </div>
      {entryModal && (
          <BlogEntry
            blogData={entries.find(entry => entry.name === entryModal)}
          />
      )}
    </div>
  );
};

export default Blog;
