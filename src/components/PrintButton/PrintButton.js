import React from 'react'
import './PrintButton.css'

const PrintButton = ({ id, documentName }) => {
  const handlePrint = () => {
    const component = document.getElementById(id)
    const htmlContent = component.outerHTML
    const newWindow = window.open('', '_blank')

    const styles = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map(style => style.outerHTML)
      .join('')

    newWindow.document.write(`
      <html>
        <head>
          <title>${documentName}</title>
          ${styles}
          <style>
            /* Define print-specific styles here */
            @media print {
              body {
                font-family: Arial, sans-serif;
                font-size: 12px;
                margin-top: 50px;
                margin-bottom: 50px;
              }
              pre {
                white-space: pre-wrap; /* Ensure that text wraps */
              }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `)
    newWindow.document.close()
    newWindow.print()
  }

  return (
    <button className='print-button' onClick={handlePrint}>
      Print
    </button>
  )
}

export default PrintButton
