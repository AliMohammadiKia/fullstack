const sampleMiddleware = (request, response, next) => {
  console.log(`request for url: ${request.url} with method: ${request.method}`);
  console.log(`data is: ${request.body.firstName} ${request.body.lastName}`);
  next();
  // response.send({ success: false });
};

export default sampleMiddleware;
