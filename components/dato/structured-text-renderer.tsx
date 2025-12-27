"use client";

import { StructuredText, renderNodeRule } from "react-datocms";
import {
  isHeading,
  isParagraph,
  isList,
  isListItem,
  isBlockquote,
  isLink,
  isCode,
} from "datocms-structured-text-utils";
import Link from "next/link";
import type { StructuredTextDocument } from "react-datocms";

interface StructuredTextRendererProps {
  content: StructuredTextDocument | null | undefined;
  className?: string;
}

/**
 * Renders DatoCMS Structured Text content with custom styling
 * that matches the Cat's Den design system.
 */
export function StructuredTextRenderer({
  content,
  className = "",
}: StructuredTextRendererProps) {
  if (!content) {
    return null;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <StructuredText
        data={content}
        customNodeRules={[
          // Headings
          renderNodeRule(isHeading, ({ node, children, key }) => {
            const headingClasses: Record<number, string> = {
              1: "font-heading text-4xl font-bold text-charcoal mb-6",
              2: "font-heading text-3xl font-bold text-charcoal mb-5 mt-10",
              3: "font-heading text-2xl font-semibold text-charcoal mb-4 mt-8",
              4: "font-heading text-xl font-semibold text-charcoal mb-3 mt-6",
              5: "font-heading text-lg font-medium text-charcoal mb-2 mt-4",
              6: "font-heading text-base font-medium text-charcoal mb-2 mt-4",
            };
            const className = headingClasses[node.level];
            
            switch (node.level) {
              case 1:
                return <h1 key={key} className={className}>{children}</h1>;
              case 2:
                return <h2 key={key} className={className}>{children}</h2>;
              case 3:
                return <h3 key={key} className={className}>{children}</h3>;
              case 4:
                return <h4 key={key} className={className}>{children}</h4>;
              case 5:
                return <h5 key={key} className={className}>{children}</h5>;
              case 6:
              default:
                return <h6 key={key} className={className}>{children}</h6>;
            }
          }),

          // Paragraphs
          renderNodeRule(isParagraph, ({ children, key }) => (
            <p key={key} className="text-charcoal-light leading-relaxed mb-4">
              {children}
            </p>
          )),

          // Lists
          renderNodeRule(isList, ({ node, children, key }) => {
            if (node.style === "numbered") {
              return (
                <ol
                  key={key}
                  className="list-decimal list-inside space-y-2 mb-4 text-charcoal-light"
                >
                  {children}
                </ol>
              );
            }
            return (
              <ul
                key={key}
                className="list-disc list-inside space-y-2 mb-4 text-charcoal-light"
              >
                {children}
              </ul>
            );
          }),

          // List items
          renderNodeRule(isListItem, ({ children, key }) => (
            <li key={key} className="leading-relaxed">
              {children}
            </li>
          )),

          // Blockquotes
          renderNodeRule(isBlockquote, ({ children, key }) => (
            <blockquote
              key={key}
              className="border-l-4 border-terracotta pl-6 my-6 italic text-charcoal-light bg-coral-light/30 py-4 pr-4 rounded-r-lg"
            >
              {children}
            </blockquote>
          )),

          // Links
          renderNodeRule(isLink, ({ node, children, key }) => {
            const isExternal =
              node.url.startsWith("http") || node.url.startsWith("//");
            if (isExternal) {
              return (
                <a
                  key={key}
                  href={node.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              );
            }
            return (
              <Link
                key={key}
                href={node.url}
                className="text-terracotta hover:text-terracotta-dark underline underline-offset-2 transition-colors"
              >
                {children}
              </Link>
            );
          }),

          // Code blocks
          renderNodeRule(isCode, ({ node, key }) => (
            <pre
              key={key}
              className="bg-charcoal text-cream p-4 rounded-xl overflow-x-auto my-6 text-sm"
            >
              <code>{node.code}</code>
            </pre>
          )),
        ]}
        // Render inline marks (bold, italic, etc.)
        renderInlineRecord={({ record }) => {
          // Handle inline records (embedded content)
          return <span>{String(record)}</span>;
        }}
        renderLinkToRecord={({ record, children }) => {
          // Handle links to other DatoCMS records
          return (
            <Link
              href={`/${record.slug || record.id}`}
              className="text-terracotta hover:text-terracotta-dark underline"
            >
              {children}
            </Link>
          );
        }}
        renderBlock={({ record }) => {
          // Handle block records (embedded blocks)
          // Extend this based on your block types
          return (
            <div className="my-6 p-4 bg-cream-dark rounded-xl">
              <pre className="text-xs">
                {JSON.stringify(record, null, 2)}
              </pre>
            </div>
          );
        }}
      />
    </div>
  );
}

export default StructuredTextRenderer;






