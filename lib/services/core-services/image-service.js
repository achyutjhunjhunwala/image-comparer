import logger from '../../utils/logger';

export default async (_img1, _img2) => {
  const img1 = await _img1.fetchImage();
  logger.info('Image-Service: Image 1 fetched');
  const img2 = await _img2.fetchImage();
  logger.info('Image-Service: Image 2 fetched');

  return [img1, img2];
};
