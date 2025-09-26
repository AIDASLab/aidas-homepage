"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function Anchor({ node, ...props }) {
  return <a {...props} className="text-blue-700 hover:text-blue-800 underline" />;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown prose lg:prose-xl mx-auto mb-10">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          a: Anchor,
          table: ({ node, ...props }) => (
            <table
              className="w-full border-collapse border border-gray-300 text-sm"
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 bg-gray-100 px-3 py-2 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-3 py-2 align-top" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}