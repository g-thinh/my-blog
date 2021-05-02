import { NextApiRequest, NextApiResponse } from "next";

const baseURL = "https://api.storyblok.com/v1/cdn/stories";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    const { code_slug } = req.query;
    const randomId = Math.floor(Math.random() * 10000);
    const API_KEY = process.env.sbKey;
    const response = await fetch(
      `${baseURL}/code/${code_slug}?&token=${API_KEY}&cv=${randomId}`
    );
    const { story } = await response.json();
    res.status(200).send(story);
  } catch (error) {
    res.status(500).send(error);
  }
};
