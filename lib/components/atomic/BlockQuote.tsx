export function BlockQuote({ children }): JSX.Element {
    return <div className=" bg-gray-100 text-lg border-l-4 pl-4 italic py-4 text-left">
        <blockquote >{children}</blockquote>
    </div>
}