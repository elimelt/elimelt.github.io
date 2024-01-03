import MarkdownFileViewer from "../MarkdownFileViewer/MarkdownFileViewer"
import './FileViewer.css'
import Game from "../Game/Game"

const FileViewer = ({ fileName, fileContents }) => {
    const parts = fileName.split('.')
    const extension = parts[parts.length - 1]
    const isImage = ['png', 'jpg', 'jpeg', 'gif'].includes(extension)

    const headingStyle = {
        fontSize: '1.5rem',
        margin: '1rem 0',
    }

    if (isImage)
        return (
            <div className='file-viewer'>
                <h2 style={headingStyle}>{fileName}</h2>
                <img src={fileContents} alt='file' />
            </div>
        )

    const isMarkdown = extension === 'md'
    if (isMarkdown)
        return  <MarkdownFileViewer content={fileContents} />


    const isCode = ['js', 'java', 'py', 'c', 'cpp', 'kt'].includes(extension)

    if (isCode)
        return (
            <div className='file-viewer'>
                <h2 style={headingStyle}>{fileName}</h2>
                <Game defaultSnippet={fileContents.split('\n')} />
            </div>
        )

    const isHTML = extension === 'html'

    if (isHTML)
        return (
            <div className='file-viewer'>
                <h2 style={headingStyle}>{fileName}</h2>
                <div dangerouslySetInnerHTML={{ __html: fileContents }} />
            </div>
        )

    return (
        <div className='file-viewer'>
            <h2 style={headingStyle}>{fileName}</h2>
            <p stye={{ color: 'red' }}>Warning: unsupported file</p>
            <p>{fileContents}</p>
        </div>
    )

}

export default FileViewer