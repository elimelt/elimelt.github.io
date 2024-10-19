import React, { useEffect } from 'react'
import styled from 'styled-components'
import PostFeed from '../../../components/PostFeed/PostFeed'

const PageContainer = styled.div`
  background-color: #f4f4f4;
  min-height: 100vh;
  padding: 20px 0;
`

const NewsFeedTitle = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

const NewsfeedPage = () => {
  const samplePosts = [
    {
      timestamp: '2 hours ago',
      subject: 'First Post',
      content: 'This is my first post on the feed!'
    },
    {
      timestamp: '1 hour ago',
      subject: 'Second Post',
      content: 'Another post for the feed.'
    }
  ]

  useEffect(() => {
    // const getPostsUrl = 'https://raw.githubusercontent.com/elimelt/posts/main/posts.json';
    // fetch(getPostsUrl)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //   });
  }, [])

  return (
    <PageContainer>
      <NewsFeedTitle>My News Feed</NewsFeedTitle>
      <PostFeed posts={samplePosts} />
    </PageContainer>
  )
}

export default NewsfeedPage
