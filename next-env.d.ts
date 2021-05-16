/// <reference types="next" />
/// <reference types="next/types/global" />

interface StoryPage {
  story: Story;
}

interface StoriesPage {
  stories: Stories;
  page?: Story;
}

interface Params {
  version: string;
  cv?: number;
}
