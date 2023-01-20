import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import dynamic from 'next/dynamic';

import 'katex/dist/katex.min.css';

interface Props {
    children: string;
}

const MathPackagesPromise = Promise.all([
    import('remark-math'),
    import('rehype-katex'),
]);

export default function MardownWithMathRenderer({ children }: Props) {
    const [mathPackage, setMathPackage] = React.useState<[(typeof import('remark-math')), (typeof import('rehype-katex'))] | null>(null);
    useEffect(() => {
        MathPackagesPromise.then(setMathPackage);
    }, [setMathPackage]);

    return (
        <ReactMarkdown
            remarkPlugins={[remarkBreaks, ...mathPackage ? [mathPackage[0].default] : []]}
            rehypePlugins={[...mathPackage ? [mathPackage[1].default] : []]}>
            {children}
        </ReactMarkdown>
    );
}