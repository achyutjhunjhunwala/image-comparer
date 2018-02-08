import { Router } from 'express';
import compareImage from './compare-images';

const routes = new Router();

routes.use('/', compareImage);

routes.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
});

export default routes;
