// import React from 'react'
import './MarkdownFileViewer.css'
// import Markdown from 'react-markdown'
// // import rehypeHighlight from 'rehype-highlight'

// const MarkdownFileViewer = ({ content }) => {
//   return (
//     <div className='markdown-file-viewer'>
//       <pre className='md-content'>
//         <Markdown>{content}</Markdown>
//       </pre>
//     </div>
//   )
// }

import ReactMarkdown from 'react-markdown'
import remarkMathPlugin from 'remark-math'
import remarkGfmPlugin from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css';
// import rehypeRaw from 'rehype-raw'

function MarkdownFileViewer (props) {
  const newProps = {
    ...props,
    remarkPlugins: [remarkMathPlugin, remarkGfmPlugin, ],
    rehypePlugins: [rehypeHighlight, rehypeKatex, ],
  }
  return (
    <div className='markdown-file-viewer'>
      <pre className='md-content'>
          <ReactMarkdown {...newProps} />
      </pre>
    </div>
  )
}

export default MarkdownFileViewer
