// utilities/paginate.js

function paginate(req) {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;

  const page = parseInt(req.query.page, 10) || DEFAULT_PAGE;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { skip, limit, page };
}

module.exports = { paginate };
