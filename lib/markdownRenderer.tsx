import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import breaks from 'remark-breaks';

import 'katex/dist/katex.min.css';

interface Props {
    children: string;
}

export default function MarkdownRender({ children }: Props) {

    return (
        <ReactMarkdown remarkPlugins={[remarkMath, breaks]} rehypePlugins={[rehypeKatex]}>
            {children}
        </ReactMarkdown>
    );
}