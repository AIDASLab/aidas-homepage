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
        remarkPlugins={[remarkGfm]}     // <-- enables tables, task lists, autolinks, etc.
        rehypePlugins={[rehypeRaw]}     // <-- allows <br /> inside cells (raw HTML)
        components={{ a: Anchor }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}