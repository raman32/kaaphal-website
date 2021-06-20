import clsx from 'clsx';
import React from 'react';

export type IconProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement>

const ArticleSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
</svg>
export const ArticleIcon: React.FC<IconProps> = (props) => <ArticleSvg {...props} />;

const ScholarshipSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
</svg>
export const ScholarshipIcon: React.FC<IconProps> = (props) => <ScholarshipSvg {...props} />;

const LoksewaSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
</svg>

export const LoksewaIcon: React.FC<IconProps> = (props) => <LoksewaSvg {...props} />;

export const InformationSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export const InformationIcon: React.FC<IconProps> = (props) => <InformationSvg {...props} />;

const NotificationSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
</svg>
export const NotificationIcon: React.FC<IconProps> = (props) => <NotificationSvg {...props} />;

export const UserSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export const UserIcon: React.FC<IconProps> = (props) => <UserSvg {...props} />;

const HotShotSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

export const HotShotIcon: React.FC<IconProps> = (props) => <HotShotSvg {...props} />;

const TickSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export const TickIcon: React.FC<IconProps> = (props) => <TickSvg {...props} />;

const CrossSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export const CrossIcon: React.FC<IconProps> = (props) => <CrossSvg {...props} />;

const DollorSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
export const DollorIcon: React.FC<IconProps> = (props) => <DollorSvg {...props} />;

const FeedSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg>

export const FeedIcon: React.FC<IconProps> = (props) => <FeedSvg {...props} />;

const LikeSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
</svg>

export const LikeIcon: React.FC<IconProps> = (props) => <LikeSvg {...props} />;

const LikeFilledSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
</svg>

export const LikeFilledIcon: React.FC<IconProps> = (props) => <LikeFilledSvg {...props} />;


const DislikeSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
</svg>

export const DislikeIcon: React.FC<IconProps> = (props) => <DislikeSvg {...props} />;

const DislikeFilledSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} viewBox="0 0 20 20" fill="currentColor">
    <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
</svg>


export const DislikeFilledIcon: React.FC<IconProps> = (props) => <DislikeFilledSvg {...props} />;


const HappySvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

export const HappyIcon: React.FC<IconProps> = (props) => <HappySvg {...props} />;

const HappyFilledSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
</svg>

export const HappyFilledIcon: React.FC<IconProps> = (props) => <HappyFilledSvg {...props} />;

const SadSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

export const SadIcon: React.FC<IconProps> = (props) => <SadSvg {...props} />;

const SadFilledSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
</svg>


export const SadFilledIcon: React.FC<IconProps> = (props) => <SadFilledSvg {...props} />;

const FireSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
</svg>

export const FireIcon: React.FC<IconProps> = (props) => <FireSvg {...props} />;

const FireFilledSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
</svg>

export const FireFilledIcon: React.FC<IconProps> = (props) => <FireFilledSvg {...props} />;

const CommentSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>

export const CommentIcon: React.FC<IconProps> = (props) => <CommentSvg {...props} />;

const FlagSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
</svg>


export const FlagIcon: React.FC<IconProps> = (props) => <FlagSvg {...props} />;

const PenSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>


export const PenIcon: React.FC<IconProps> = (props) => <PenSvg {...props} />;


const SearchSvg: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" className={clsx('h-6 w-6 inline align-middle', props.className,)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
</svg>


export const SearchIcon: React.FC<IconProps> = (props) => <SearchSvg {...props} />;
