const express = require("express");
const bodyParser = require("body-parser");
const Joi = require("joi");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const helmet = require("helmet");
app.use(helmet());

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Form đăng ký người dùng");
 
});


const validate = (student) => {
  let Schema = Joi.object({
    id: Joi.number(),
    email: Joi.string().email().required(),
    name: Joi.string().max(40).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).min(8).required(),
    confirmPassword: Joi.ref("password"),
  });
  return Schema.validate(student);
};
app.post("/api/student", (req, res) => {
  const body = req.body;
  const validRes = validate(body);
  ///console.log(validRes.error);
  ///if success
  if (validRes.error === undefined) {
    res.send({
      Status: 200,
      Msg: "A student added",
      Data: body,
    });
  } else {
    res.send({
      Status: 400,
      Msg: validRes.error.details[0].message,
    });
  }
});

app.listen(3000, () => {
  console.log("server started on port:3000");
});
