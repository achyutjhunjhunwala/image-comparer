# Image-Comparer
Tool to check if 2 images are same

Features:

- Ability to test how different 2 images are by passing 2 image URL's
- Support CORS

Technical Features:
- Babel support with node environment
- Logging
- Testing with Jest
- Airbnb eslint
- Hooks for commits and push to maiantain code quality.

#### Install
```
yarn
```

#### Debug
Uses chrome inspect flag for debugging.
```
npm run serve:debug
```
#### Testing
```
npm run test
```
#### Build
```
npm run build
```
#### Running Build Version Locally
```
cd dist/
node index.js
```

#### Using Docker
```
docker build -t image-comparer .
```
