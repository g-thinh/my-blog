import { NextApiRequest, NextApiResponse } from "next";

const baseURL = "https://api.storyblok.com/v1/cdn/stories";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const randomId = Math.floor(Math.random() * 10000);
    const API_KEY = process.env.sbKey;
    const response = await fetch(
      `${baseURL}?filter_query[component][in]=foodpost&token=${API_KEY}&cv=${randomId}`
    );
    const { stories } = await response.json();
    console.log(stories);
    res.status(200).send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
};
