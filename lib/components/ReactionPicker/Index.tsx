import { message } from 'antd';
import clsx from 'clsx';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { ReactionType, useReactToPostMutation } from '../../../gql';
import { ReactionDto } from '../../../src/api/common/dto/reaction.dto';
import useStore from '../../../store/storeProvider';
import { skipper } from '../../accessToken';
import { DislikeFilledIcon, DislikeIcon, FireFilledIcon, FireIcon, HappyFilledIcon, HappyIcon, LikeFilledIcon, LikeIcon, SadFilledIcon, SadIcon } from '../Icons/Index';

const reactionsComponents = [
    { label: ReactionType.Angry, icon: <FireIcon className="align-text-top" />, filledIcon: <FireFilledIcon className="align-text-top" />, class: 'text-red-500' },
    { label: ReactionType.Like, icon: <LikeIcon className="align-text-top" />, filledIcon: <LikeFilledIcon className="align-text-top" />, class: 'text-blue-500' },
    { label: ReactionType.Dislike, icon: <DislikeIcon className="align-text-top" />, filledIcon: <DislikeFilledIcon className="align-text-top" />, class: 'text-purple-500' },
    { label: ReactionType.Happy, icon: <HappyIcon className="align-text-top" />, filledIcon: <HappyFilledIcon className="align-text-top" />, class: 'text-yellow-500' },
    { label: ReactionType.Sad, icon: <SadIcon className="align-text-top" />, filledIcon: <SadFilledIcon className="align-text-top" />, class: 'text-green-500' }
]

function ReactionPicker({ reactions, postId, selectable = true }: { reactions: ReactionDto[], postId: string, selectable?: boolean }): JSX.Element {
    const store = useStore();
    const [createReaction] = useReactToPostMutation();
    const [selected, setSelected] = useState(-1);
    const [reactions_, setReaction] = useState(reactions ? [
        reactions.filter(reaction => reaction.type == ReactionType.Angry).length,
        reactions.filter(reaction => reaction.type == ReactionType.Like).length,
        reactions.filter(reaction => reaction.type == ReactionType.Dislike).length,
        reactions.filter(reaction => reaction.type == ReactionType.Happy).length,
        reactions.filter(reaction => reaction.type == ReactionType.Sad).length,
    ] : [0, 0, 0, 0, 0])
    const handleSelect = (index) => {
        if (!store.user) {
            message.error('Please Login to React')
            return;
        }
        setReaction(prev => prev.map((reaction, index_) => index_ === selected ? reaction - 1 : reaction))
        if (index === selected) {
            setSelected(-1)
        } else {
            setReaction(prev => prev.map((reaction, index_) => index_ === index ? reaction + 1 : reaction))
            setSelected(index);
        }
        createReaction({ variables: { reaction: { type: reactionsComponents[index].label, postId: postId } } })
    }
    useEffect(() => {
        if (store.user && reactions && reactions.length) {
            const userSelectedReaction = reactions.find(reaction => reaction.userId === store.user.id);
            if (userSelectedReaction)
                setSelected(reactionsComponents.findIndex(reaction => reaction.label === userSelectedReaction.type))
        }
    }, [store.user])

    return <div className="align-text-top flex flex-row flex-shrink mt-4 justify-center">
        {
            reactionsComponents.map((reaction, index) => <div key={reaction.label} className={clsx('mx-2', reaction.class)}>
                {reactions_[index]}
                <span className={clsx(selectable ? 'cursor-pointer hover:opacity-70' : '')} onClick={() => selectable ? handleSelect(index) : null}>
                    {selected === index ? reaction.filledIcon : reaction.icon}
                </span>
            </div>)
        }
    </div>
}

export default observer(ReactionPicker)