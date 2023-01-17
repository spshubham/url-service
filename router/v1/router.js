var express = require("express");
var router = express.Router();
const userController = require("../../controllers/v1/user");
const urlController = require("../../controllers/v1/url")
const auth = require("../../middleware/auth");

/* User API routes */
router.post("/user/signup", function(req, res, next){
  userController.signUp(req, res, next, req.body);
});
router.get("/user/login", function(req, res, next){
  userController.getDetails(req, res, next, req.query["email"], req.query["password"]);
});



router.post("/url/add", auth, (req, res,next) => {
  urlController.addUrl(req, res, next,req.body)
});
router.put("/url/update", auth, (req, res,next) => {
  urlController.updateUrl(req, res, next,req.body)
});
router.get("/url/list", auth, (req, res,next) => {
  urlController.listUrl(req, res, next)
});
router.delete("/url/remove", auth, (req, res,next) => {
  urlController.removeUrl(req, res, next,)
});

router.get("/url/track", auth, (req, res,next) => {
  urlController.trackUrl(req, res, next,)
});

module.exports = router;
