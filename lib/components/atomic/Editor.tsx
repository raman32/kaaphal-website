
import React, { useEffect, useState } from 'react'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'

import BraftEditor from 'braft-editor'
import Table from 'braft-extensions/dist/table'
import { Spin, Typography } from 'antd'

const options = {
    columnResizable: true,
    setFirstRowAsHead: true,

}

BraftEditor.use(Table(options))
export default function Editor(props: { onChange?: (props: any) => any, value?: string }): JSX.Element {
    const [editorState, setEditorState] = useState(BraftEditor.createEditorState(props.value ? props.value : ''))
    const handleChange = (value) => {
        setEditorState(value);
        if (value) props.onChange(value.toHTML())
    }
    if (typeof window !== undefined) return < BraftEditor value={editorState} language="en" onChange={handleChange} />;
    return <div className="self-center text-center w-full" ><Spin /> <Typography className="my-4">Loading</Typography></div>
}