import clsx from 'clsx';
import { useState } from 'react';
import { DislikeFilledIcon, DislikeIcon, FireFilledIcon, FireIcon, HappyFilledIcon, HappyIcon, LikeFilledIcon, LikeIcon, SadFilledIcon, SadIcon } from '../Icons/Index';


export default function ReactionPicker({ fire, like, dislike, happy, sad, selected_, onChange }) {
    const [selected, setSelected] = useState(selected_)
    const handleSelect = (value) => {
        value === selected ?
            setSelected('') :
            setSelected(value);
    }
    const reactions = [
        { label: 'fire', icon: <FireIcon className="align-text-top" />, filledIcon: <FireFilledIcon className="align-text-top" />, value: fire, class: 'text-red-500' },
        { label: 'like', icon: <LikeIcon className="align-text-top" />, filledIcon: <LikeFilledIcon className="align-text-top" />, value: like, class: 'text-blue-500' },
        { label: 'dislike', icon: <DislikeIcon className="align-text-top" />, filledIcon: <DislikeFilledIcon className="align-text-top" />, value: dislike, class: 'text-purple-500' },
        { label: 'happy', icon: <HappyIcon className="align-text-top" />, filledIcon: <HappyFilledIcon className="align-text-top" />, value: happy, class: 'text-yellow-500' },
        { label: 'sad', icon: <SadIcon className="align-text-top" />, filledIcon: <SadFilledIcon className="align-text-top" />, value: sad, class: 'text-green-500' }
    ]
    return <div className="align-text-top flex flex-row flex-shrink mt-4 justify-center">
        {
            reactions.map(reaction => <div key={reaction.label} className={clsx('mx-2', reaction.class)}>
                {reaction.value}
                <span className="cursor-pointer hover:opacity-70" onClick={() => handleSelect(reaction.label)}>
                    {selected === reaction.label ? reaction.filledIcon : reaction.icon}
                </span>
            </div>)
        }
    </div>
}