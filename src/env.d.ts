/// <reference types="@rsbuild/core/types" />

import type { MdxSlideFrontmatter } from "./types";

declare module "*.md" {
  import type { JSX } from "react";
  const Content: JSX.Element;
  export default Content;
  export const frontmatter: MdxSlideFrontmatter;
}
declare module "*.mdx" {
  import type { JSX } from "react";
  const Content: JSX.Element;
  export default Content;
  export const frontmatter: MdxSlideFrontmatter;
}
