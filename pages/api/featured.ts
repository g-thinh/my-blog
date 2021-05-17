import { NextApiRequest, NextApiResponse } from "next";
import Storyblok from "@utils/storyblok";

export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    const { data } = await Storyblok.get("cdn/stories", {
      by_slugs: "blog/*,code/*",
      per_page: 5,
      sort_by: "published_at:desc",
    });
    res.status(200).send(data.stories);
  } catch (error) {
    res.status(500).send(error);
  }
};
