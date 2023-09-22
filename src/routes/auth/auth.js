var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get("/login/success", (req, res) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});



module.exports = router;
