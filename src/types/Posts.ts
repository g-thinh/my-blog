export type FrontmatterProperties = {
  title?: string;
  description?: string;
  published?: Date;
  backgroundImage?: string;
  isDraft?: boolean;
  tags?: string[];
};

export type MarkdownFrontmatter = {
  frontmatter: FrontmatterProperties;
  slug: string;
  full_slug: string;
};

export type Posts = {
  posts: MarkdownFrontmatter[];
};

export type SinglePost = {
  frontmatter: FrontmatterProperties;
  markdownContent: string;
};
