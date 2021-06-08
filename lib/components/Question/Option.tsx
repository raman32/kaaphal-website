import { Radio } from 'antd';
import { useState } from 'react';
import { CrossIcon, TickIcon } from '../Icons/Index';
export function Option({ title, isCorrect, ...props }: React.ComponentProps<typeof Radio.Button> & { title?: string, isCorrect: boolean }): JSX.Element {
    const [clicked, setClicked] = useState(false);
    return <Radio.Button {...props} className={'shadow hover:shadow-md w-80 overflow-visible ' + props.className} onClick={() => setClicked(true)}> {title ? title : ''} &nbsp; {props.children} {clicked ? isCorrect ? <TickIcon className="align-text-top" /> : <CrossIcon className="align-text-top" /> : null}</Radio.Button>
}