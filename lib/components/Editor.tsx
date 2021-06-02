import BraftEditor from 'braft-editor'
import React, { useState } from 'react'
import 'braft-editor/dist/index.css'

export default function Editor(props: { onChange?: (props: any) => any }): JSX.Element {
    const [editorState, setEditorState] = useState(null)
    const handleChange = (value) => {
        setEditorState(value);
        if (value) props.onChange(value.toHTML())
    }
    if (typeof window !== undefined) return < BraftEditor value={editorState} language="en" onChange={handleChange} />;
    return <div></div>
}