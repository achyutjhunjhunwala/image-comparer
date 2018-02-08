import { check } from 'express-validator/check';

export default [
  check('imgUrl1').exists(),
  check('imgUrl2').exists(),
];
