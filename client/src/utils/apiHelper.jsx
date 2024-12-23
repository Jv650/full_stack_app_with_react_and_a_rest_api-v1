//export - dont forget to export so yu can use this function in other components
//the api function needs to know the URL and fetch method to make call
export const api = (path, method = "GET", body = null, credentials = null) => {
  const url = "http://localhost:5000/api" + path;

  const options = {
    method: method,
    headers: {},
  };
  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.firstName}:${credentials.lastName}:${credentials.emailAddress}:${credentials.password}`
    );
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }
  //api func wil return the fetch method, taking in url and options
  return fetch(url, options);
};
