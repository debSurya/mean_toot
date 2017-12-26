var express = require('express');
var router = express.Router();

router.route('/posts').get(function (req, res) {
    res.send({
        msg: 'wdqwdoij'
    });
}).post(function (req, res) {
    res.send(406);
});

router.route('/posts/:id').get(function (req, res) {
    res.send(req.params.id);
}).put(function (req, res) {
    res.send({
        msg: 'wefjwejfoij'
    });
}).delete(function (req, res) {
    res.send('deleted')
});

module.exports = router;