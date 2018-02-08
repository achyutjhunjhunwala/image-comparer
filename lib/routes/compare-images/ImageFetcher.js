import fetch from 'node-fetch';

export default class ImageFetcher {
  constructor(url) {
    this.url = url;
  }

  readResponseAsBlob(response) {
    return response.buffer();
  }

  validateResponse(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  fetchImage() {
    return fetch(this.url)
      .then(res => this.validateResponse(res))
      .then(res => this.readResponseAsBlob(res));
  }
}
