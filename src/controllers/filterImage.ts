import { RequestHandler, Request, Response } from "express";
import { filterImageFromURL, deleteLocalFiles } from '../util/util';

const filterImage: RequestHandler = async (req: Request, res: Response) => {
  const imageUrl: string = req.query.image_url;

  if (!imageUrl) {
    return res.status(400).send({
      message: "The image url is invalid. Please try again."
    });
  }

  const filteredImage = await filterImageFromURL(imageUrl);

  if (!filterImage) return res.status(422).send({ message: "Unable to proccess request." });

  return res.status(200).sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
};

export default filterImage;