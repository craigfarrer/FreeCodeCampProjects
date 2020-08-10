import React, { useState } from 'react'
import MarkdownPreview from './MarkdownPreview';

const initialState = `
# This is header H1 size
## This is header H2 size
This is a link:
[link](https://majatravels.com)
  
This is inline code: \`<div></div>\`.
\n
This is a code block:
\`\`\`
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
**This is a list**:
- a
- b
- c
\n
This is a quote:
\n
> Block Quote
\n
![Craig Farrer](https://github.com/craigfarrer)
`

const UserInput = (props) => {

    const [md, setMd] = useState(initialState);

    const updateMd = (e) => {
        setMd(e.target.value)
    }

    return (
        <div className="row">
            <div className="col-md-6">
                <h3 className="text-center">Markdown</h3>
                <textarea 
                    type="text" 
                    className="md-input" 
                    id="editor"
                    value={md} 
                    onChange={updateMd} />

            </div>
            <div className="col-md-6">
                <h3 className="text-center">Preview</h3>
                <MarkdownPreview markDown={md} />
            </div>

        </div>
    )
}

export default UserInput

