express = require('express')
fs = require('fs');
router = express.Router()


router.get '/comments.json', (req, res, next) ->
  fs.readFile 'comments.json', (err, data) ->
    res.setHeader 'Content-Type', 'application/json'
    res.send data
  return

router.post '/comments.json', (req, res, next) ->
  fs.readFile 'comments.json', (err, data) ->
    comments = JSON.parse data
    comments.push req.body
    fs.writeFile 'comments.json', JSON.stringify(comments, null, 4), (err) ->
      res.setHeader 'Content-Type', 'application/json'
      res.setHeader 'Cache-Control', 'no-chache'
      res.send JSON.stringify comments
  return

module.exports = router
