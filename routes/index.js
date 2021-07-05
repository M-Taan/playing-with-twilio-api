var express = require("express");
var router = express.Router();
var twilio = require("twilio");
var env = require("dotenv").config();

router.get("/", (req, res) => {
  res.render("index");
});

const hostname = "https://faf561658e70.ngrok.io";
const twilioNumber = "+13239978691";

router.post("/handle-response", (req, res, next) => {
  const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  const number = req.body.number.replace("[()\\s-]+", "");

  client.calls
    .create({
      url: `${hostname}/response`,
      to: `+${number}`,
      from: twilioNumber,
    })
    .then((call) => {
      res.send(call);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/respone", (req, res) => {
  var VoiceResponse = twilio.twiml.VoiceResponse;
  var twiml = new VoiceResponse();

  twiml.say({ voice: "alice", language: "en-US", loop: 3 }, "Hello");
  res.send(twiml.toString());
});

module.exports = router;
