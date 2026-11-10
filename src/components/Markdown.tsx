import { MDXRemote } from "next-mdx-remote/rsc";
import { BeforeAfter } from "./BeforeAfter";

const components = { BeforeAfter };

/** Renders markdown/MDX content from the content folder with the site's prose styles. */
export function Markdown({ source, className = "" }: { source: string; className?: string }) {
  return (
    <div className={`prose-jf ${className}`}>
      <MDXRemote source={source} components={components} />
    </div>
  );
}
