express = require('express')
router = express.Router()

### GET home page. ###

router.get '/', (req, res, next) ->
  res.json api: 'test'
  return

module.exports = router
