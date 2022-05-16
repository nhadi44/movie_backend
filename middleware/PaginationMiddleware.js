const paginationMiddleware = (req, res, next) => {
  let pageSize = parseFloat(req.query.pageSize);
  let page = parseFloat(req.query.page);

  if (isNaN(page) && isNaN(pageSize)) return next();

  if (isNaN(page)) {
    page = 1;
  } else {
    page = (page - 1) * pageSize;
  }

  req.query.page = page;
  req.query.pageSize = pageSize;
  console.log(req.query);
  next();
};

module.exports = paginationMiddleware;
