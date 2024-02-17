import React from 'react'
import styled from 'styled-components'

const PostContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const Timestamp = styled.span`
  color: #888;
  font-size: 0.8em;
`

const Subject = styled.h3`
  margin: 0;
`

const Content = styled.p`
  margin: 0;
  color: #333;
  line-height: 1.6;
`

const StatusUpdate = ({ timestamp, subject, content }) => {
  return (
    <PostContainer>
      <PostHeader>
        <Subject>{subject}</Subject>
        <Timestamp>{timestamp}</Timestamp>
      </PostHeader>
      <Content>{content}</Content>
    </PostContainer>
  )
}

export default StatusUpdate
