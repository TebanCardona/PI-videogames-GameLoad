module.exports = (err, req, res, next) => {
  res
    .status(err.statusCode ? err.statusCode : 500)
    .send({ error: true, message: err.message });
};