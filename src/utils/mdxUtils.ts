import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";

export const POSTS_PATH = path.join(process.cwd(), "mdx/posts");
export const LANDING_PATH = path.join(process.cwd(), "mdx");

export function getSourceOfFile(fileName, contentPath) {
  return fs.readFileSync(path.join(contentPath, fileName));
}

export function getAllPosts(contentPath) {
  return fs
    .readdirSync(contentPath)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = getSourceOfFile(fileName, contentPath);
      const slug = fileName.replace(/\.mdx?$/, "");
      const full_slug = `/posts/${slug}`;
      const { data } = matter(source);

      return {
        frontmatter: data,
        slug: slug,
        full_slug,
      };
    });
}

export async function getSinglePost(slug, contentPath) {
  const source = getSourceOfFile(slug + ".mdx", contentPath)
    .toString()
    .trim();
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const { code, frontmatter } = await bundleMDX(source, {
    cwd: contentPath,
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkMdxCodeMeta,
      ];

      return options;
    },
  });

  return {
    frontmatter,
    markdownContent: code,
  };
}
