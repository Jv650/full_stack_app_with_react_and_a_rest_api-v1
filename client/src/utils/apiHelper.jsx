//export - dont forget to export so yu can use this function in other components
//the api function needs to know the URL and fetch method to make call
export const api = async (
  path,
  method = "GET",
  body = null,
  credentials = null
) => {
  const url = `http://localhost:5000/api${path}`;

  const options = {
    method: method, //http method (get, post, put, delete)
    headers: {}, //headers will be populated dynamically
  };
  //add body to the request if provided for POSt and PUT
  if (body) {
    options.body = JSON.stringify(body);
    options.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  //add authroization header if credentials are provided
  if (credentials) {
    const encodedCredentials = btoa(
      `${credentials.username}:${credentials.password}`
    ); //maybe changebakc to emailAddress
    options.headers.Authorization = `Basic ${encodedCredentials}`;
  }

  const response = await fetch(url, options);

  console.log("Response status:", response.status);
  console.log("Response body:", await response.clone().text());

  return response;
};
// try {
//   //console.log({ url, options }); //debugging req
//   const response = await fetch(url, options);

//   if (!response.ok) {
//     console.log("logging res", response);
//     console.log(response.headers.get("content-type"));
//     const error = await response.json();
//     throw new Error(error.message || response.status);
//   }
//   if (response.status === 204) {
//     return null;
//   }
//   console.log("api response:", response);
//   return response;
// } catch (error) {
//   console.log("unknown error:");
//   console.error(`API error: ${error.message}`);
//   throw error;
// }
