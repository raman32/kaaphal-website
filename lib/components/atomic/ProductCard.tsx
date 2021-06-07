import { Button, Card, Divider } from 'antd';
interface props {
    title: string;
    children: JSX.Element;
    buttonText: string;
    className: string;
    onButtonClick: () => void;
}

export function ProductCard({ title, children, buttonText, onButtonClick, className }: props): JSX.Element {
    return <Card hoverable className={'flex flex-col justify-between ' + className}>
        <div className="">{title}</div>
        <Divider />
        <div>
            {children}
        </div>
        <Divider />
        <div>
            <Button type="primary" onClick={onButtonClick}>{buttonText}</Button>
        </div>
    </Card >
}