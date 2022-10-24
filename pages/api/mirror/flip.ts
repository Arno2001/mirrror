import { resolve } from "path";
import nc from "next-connect";
import { existsSync, renameSync, unlinkSync } from "fs";
import sharp from 'sharp';

type bodyTypes = {
  imageName: string,
  flipX: boolean,
  flipY: boolean,
}
type reqType = {
  body: bodyTypes
}

const handler = nc({
  attachParams: true
})
  .put((req: reqType, res) => {
    const imageName = req.body.imageName;
    const imageExists = existsSync(resolve(`./public/images/${imageName}`));
    if (imageExists === false) {
      return { message: 'image does not exists' };
    }
    const flipH = req.body.flipX || false;
    const flipV = req.body.flipY || false;
    sharp(resolve(`./public/images/${imageName}`))
      .flop(flipH)
      .flip(flipV)
      .toFile(resolve(`./public/images/new_${imageName}`))
      .then(() => {
        unlinkSync(resolve(`./public/images/${imageName}`));
        renameSync(resolve(`./public/images/new_${imageName}`), resolve(`./public/images/${imageName}`));
      });
    res.end('mirrored')
  });

export default handler;