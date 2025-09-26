"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

function Anchor({ node, ...props }) {
  return (
    <a
      {...props}
      className="underline text-blue-600 hover:text-blue-800"
    />
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown prose mx-auto mb-10">
      <style jsx global>{`
        .markdown :where(table) {
          width: 100% !important;
          border-collapse: collapse !important;
          table-layout: auto !important;
        }

        .markdown :where(th, td) {
          padding: 6px 10px !important;
          border: 0 !important;
          vertical-align: top !important;
        }

        /* Header line: slightly thicker */
        .markdown :where(thead tr) {
          border-top: 2px solid #000 !important;
          border-bottom: 1px solid #000 !important;
        }

        .markdown :where(thead th) {
          font-weight: 700 !important;
          text-align: center !important;
        }

        /* Body rows: very thin separators */
        .markdown :where(tbody tr) {
          border-bottom: 0.5px solid #ccc !important;
        }

        /* Date column style */
        .markdown :where(tbody td:first-child) {
          font-weight: 700 !important;
          text-align: center !important;
          white-space: nowrap !important;
        }
      `}</style>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ a: Anchor }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
