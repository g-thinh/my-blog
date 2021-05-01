import { NextApiRequest, NextApiResponse } from "next";

const baseURL = "https://api.storyblok.com/v1/cdn/stories";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const randomId = Math.floor(Math.random() * 10000);
    const API_KEY = process.env.sbKey;
    const response = await fetch(
      `${baseURL}/about?version=published&token=${API_KEY}&cv=${randomId}`
    );
    const { story } = await response.json();
    res.status(200).send(story);
  } catch (error) {
    res.status(500).send(error);
  }
};
