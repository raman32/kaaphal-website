import { Radio } from 'antd';
import { useState } from 'react';
import { CrossIcon, TickIcon } from '../Icons/Index';
export function Option({ title, isCorrect, ...props }: React.ComponentProps<typeof Radio.Button> & { title?: string, isCorrect: boolean, children: (string | Element | JSX.Element)[] }): JSX.Element {
    const [clicked, setClicked] = useState(false);
    return <Radio.Button
        {...props}
        style={{ height: 'max-content' }}
        className={'shadow hover:shadow-md w-80 overflow-visible  py-2 px-4 ' + props.className}
        onClick={() => setClicked(true)}>
        {title ? title : ''} &nbsp; {props.children}
        {clicked ? isCorrect ?
            <TickIcon className="align-text-top" />
            : <CrossIcon className="align-text-top" /> : null}
    </Radio.Button>
}