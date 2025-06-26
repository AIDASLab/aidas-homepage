"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function Anchor({ node, ...props }) {
  return (
    <a
      {...props}
      className="text-blue-700 hover:text-blue-800 underline"
    />
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown prose lg:prose-xl mx-auto mb-10">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          a: Anchor,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
