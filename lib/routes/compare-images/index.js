import { Router } from 'express';
import bodyParser from 'body-parser';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import resemble from 'node-resemble-v2';
import logger from '../../utils/logger';
import ImageComparePayloadValidation from './ImageComparePayloadValidation';
import ImageFetcher from './ImageFetcher';



import getImages from '../../services/core-services/image-service';

const compareImages = new Router();
const jsonParser = bodyParser.json();

compareImages.post('/compare-images', [jsonParser, ...ImageComparePayloadValidation], async (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    logger.info('Route:compare-image, error %j', err.mapped());

    res.status(422).json({ errors: err.mapped() });
    return;
  }

  const { imgUrl1, imgUrl2 } = matchedData(req);

  logger.info('Route:compare-image, 1st image URL received: %j', imgUrl1);
  logger.info('Route:compare-image, 2nd image URL received: %j', imgUrl2);

  try {
    const image1 = new ImageFetcher(imgUrl1);
    const image2 = new ImageFetcher(imgUrl2);

    logger.info('Route:compare-image, Instance Created');

    let imagedata = await getImages(image1, image2);

    logger.info('Route:compare-image, Image Fetched');

    resemble(imagedata[0])
      .compareTo(imagedata[1])
      .scaleToSameSize()
      .ignoreAntialiasing()
      .onComplete((data) => {
        logger.info('Success in comparing');
        // Explicit GC for faster performance
        imagedata = [];
        logger.info(JSON.parse(JSON.stringify(data)));
        res.json(data);
      });
  } catch (err) {
    logger.info(`Route:compare-image, Something stupid happened for ${imgUrl1}, ${imgUrl2}`);
    next(err);
  }
});

export default compareImages;
