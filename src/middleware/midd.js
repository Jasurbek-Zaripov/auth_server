function check_browser(req, res, next) {
  let hder = JSON.stringify(req.headers['user-agent'])

  if (/(mozilla\/)|(opera\/)/i.test(hder)) {
    next()
  } else {
    return res.json({ Uzur: 'kirgiza olmayman!' })
  }
}
function CORS(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
}

module.exports = {
  CORS,
  check_browser,
}
