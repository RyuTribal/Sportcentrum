const connection = require("../db/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const randtoken = require("rand-token").generator({
  chars: "0-9",
  source: crypto.randomBytes,
});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "insert_api_key"
);

const templates = {
  acc_ver: "d-29c2fac7ecf94b14b7f5be1aa3f9e80a",
  res_pass: "d-f8fe7a4a76764c7ba78388210d7c9b7b",
};

exports.createUser = async function (req, res) {
  const password = req.body.password;
  if (password.length < 8) {
    return res.send({
      code: 204,
      failed: "Password is too short",
    });
  }
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  let user = {
    id: null,
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: encryptedPassword,
  };

  connection.query(
    "INSERT INTO EIOP_Auth.users SET ?",
    user,
    function (error, results, fields) {
      if (error) {
        if (error.errno === 1062) {
          res.send({
            code: 206,
            failed: "Email already exists",
          });
        } else {
          res.send({
            code: 500,
            failed: "Failed to register",
          });
        }
      } else {
        user.id = results.insertId;
        SendVerification(user, res);
        res.send({
          code: 200,
          success: "user registered sucessfully",
        });
      }
    }
  );
};

exports.Login = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    "SELECT * FROM EIOP_Auth.users WHERE email = ?",
    [email],
    async function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            if (results[0].isVerified == "false") {
              res.send({ code: 206, failed: "Account not verified" });
            } else {
              let user = {
                firstname: results[0].firstname,
                lastname: results[0].lastname,
                email: results[0].email,
              };
              req.session.user = user;
              res.send({
                code: 200,
                success: "login sucessfull",
                user: user,
                sessionId: req.session.id,
              });
            }
          } else {
            res.send({
              code: 204,
              failed: "Email and password does not match",
            });
          }
        } else {
          res.send({
            code: 204,
            failed: "Email and password does not match",
          });
        }
      }
    }
  );
};

exports.isLoggedIn = function (req, res) {
  if (req.session.user) {
    res.send({
      code: 200,
      success: "Session Exist",
      user: req.session.user,
      sessionId: req.session.id,
    });
  } else {
    res.send({
      code: 404,
      failed: "Session Does Not Exist",
    });
  }
};

exports.Logout = function (req, res) {
  req.session.destroy(function (err) {
    req.session = null;
  });
  res.send({
    code: 200,
    success: "Session Destroyed",
  });
};

exports.VerifyToken = async function (req, res) {
  connection.query(
    "SELECT * FROM EIOP_Auth.VerificationTokens WHERE token = ?",
    [req.params.token],
    function (err, result, fields) {
      console.log(result[0].userId);
      if (err) {
        res.send("Någonting gick fel!");
      } else {
        connection.query(
          "UPDATE EIOP_Auth.users SET isVerified = 'true' WHERE id = ?",
          [result[0].userId]
        );
        connection.query(
          "DELETE FROM EIOP_Auth.VerificationTokens WHERE token = ?",
          [req.params.token]
        );
        res.send("Nu är ditt konto verifierat! Du kan lämna sidan");
      }
    }
  );
};

exports.SendResetPassword = async function (req, res) {
  const resetCode = randtoken.generate(8);

  if (!req.body.email) {
    return res.send({ code: 404, failure: "No email provided" });
  }
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "no-reply@sportcentrum.se", // Change to your verified sender
    templateId: templates.res_pass,
    dynamic_template_data: {
      email: req.body.email,
      code: resetCode,
    },
  };
  await connection.query(
    "SELECT * FROM EIOP_Auth.users WHERE email = ?",
    [req.body.email],
    function (err, result, fields) {
      if (err) {
        return res.send({ code: 500, failure: "Email does not exist" });
      }
      let user = result[0];
      connection.query(
        "INSERT INTO EIOP_Auth.ResetTokens (userId, token) VALUES(?,?)",
        [user.id, resetCode],
        function (err, result, fields) {
          if (err) {
            console.log("Token creation fail: ", err);
          } else {
            sgMail
              .send(msg)
              .then(() => {
                res.send({
                  code: 200,
                  userId: user.id,
                  success: "Email sent successfully",
                });
              })
              .catch((error) => {
                res.send({ code: 500, failure: "Email send fail" });
              });
          }
        }
      );
    }
  );
};

exports.Password_Confirm = async function (req, res) {
  if (!req.body.password) {
    return res.send({ code: 404, failure: "No password provided" });
  }
  if (req.body.password.length < 8) {
    return res.send({
      code: 204,
      failed: "Password is too short",
    });
  }
  if (!req.body.code || !req.body.userId) {
    return res.send({ code: 404, failure: "No user id/code provided" });
  }
  const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
  connection.query(
    "SELECT * FROM EIOP_Auth.ResetTokens WHERE token = ? AND userId = ?",
    [req.body.code, req.body.userId],
    function (err, result, fields) {
      if (err) {
        res.send({ code: 500, failure: "Token doesn't exist" });
      } else {
        connection.query(
          "UPDATE EIOP_Auth.users SET password = ? WHERE id = ?",
          [encryptedPassword, result[0].userId]
        );
        connection.query(
          "DELETE FROM EIOP_Auth.ResetTokens WHERE token = ?",
          [req.body.code]
        );
        res.send({
          code: 200,
          success: "Changed password of user: " + result[0].userId,
        });
      }
    }
  );
};

async function SendVerification(user) {
  const newToken = crypto
    .randomBytes(21)
    .toString("base64")
    .slice(0, 21)
    .replace(/\//g, "");
  const msg = {
    to: user.email, // Change to your recipient
    from: "no-reply@sportcentrum.se", // Change to your verified sender
    templateId: templates.acc_ver,
    dynamic_template_data: {
      first_name: user.firstname,
      verification_url: "http://localhost:3080/api/users/token/" + newToken,
    },
  };
  connection.query(
    "INSERT INTO EIOP_Auth.VerificationTokens (userId, token) VALUES(?,?)",
    [user.id, newToken],
    function (err, res, fields) {
      if (err) {
        console.log("Token creation fail: ", err);
      } else {
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.log("Email failed to send");
          });
      }
    }
  );
}
