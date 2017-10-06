export default class Api {
  static headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  static get(route, token) {
    return this.request(route, token, null, "GET");
  }

  static put(route, token, params) {
    return this.request(route, token, params, "PUT");
  }

  static post(route, token, params) {
    return this.request(route, token, params, "POST");
  }

  static delete(route, token, params) {
    return this.request(route, token, params, "DELETE");
  }

  static request(url, token, params, verb) {
    let options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );
    options.headers = { ...Api.headers(), token};
    return fetch(url, options)
      .then(response => response.json())
      .then(responseJson => responseJson)
      .catch(error => {
        console.error(error);
      });
  }
}
