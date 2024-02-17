import React from 'react'
import styled from 'styled-components'
import StatusUpdate from '../StatusUpdate/StatusUpdate'

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px 0;
`

const PostFeed = ({ posts }) => {
  return (
    <FeedContainer>
      {posts.map((post, index) => (
        <StatusUpdate
          key={index}
          timestamp={post.timestamp}
          subject={post.subject}
          content={post.content}
        />
      ))}
    </FeedContainer>
  )
}

export default PostFeed
