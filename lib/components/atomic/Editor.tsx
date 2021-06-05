
import React, { useState } from 'react'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'

import BraftEditor from 'braft-editor'
import Table from 'braft-extensions/dist/table'

const options = {
    columnResizable: true,
    setFirstRowAsHead: true,

}

BraftEditor.use(Table(options))
export default function Editor(props: { onChange?: (props: any) => any }): JSX.Element {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''))
    const handleChange = (value) => {
        setEditorState(value);
        if (value) props.onChange(value.toHTML())
    }
    if (typeof window !== undefined) return < BraftEditor value={editorState} language="en" onChange={handleChange} />;
    return <div></div>
}