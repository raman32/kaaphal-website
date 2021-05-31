import BraftEditor from 'braft-editor'
import React, { useState } from 'react'

export default function Editor(): JSX.Element {
    const [editorState, setEditorState] = useState(null)
    if (typeof window !== undefined) return < BraftEditor value={editorState} language="en" onChange={setEditorState} />;
    return <div></div>
}