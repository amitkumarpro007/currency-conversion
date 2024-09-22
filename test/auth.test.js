const assert = require("assert");
const supertest = require("supertest");
const app = require("../index"); // Adjust the path as necessary

describe("User Registration", function () {
  it("should register a new user successfully", function (done) {
    supertest(app)
      .post("/api/register")
      .send({
        name: "testuser",
        mobileNo: "8220768177",
        email: "testuser@example.com",
        password: "1111111111",
        confirmPassword: "1111111111",
        userType: "customer",
        gender: "male",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        //assert(res.body.message === 'User registered successfully');
        done();
      });
  });

  it("should return error for missing fields", function (done) {
    supertest(app)
      .post("/api/register")
      .send({
        name: "testuser",
        // Missing password and email
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        //assert(res.body.error === 'Missing required fields');
        done();
      });
  });
});

describe("User Login", function () {
  it("should login a user successfully", function (done) {
    supertest(app)
      .post("/api/login")
      .send({
        userName: "ggrvbm@gmail.com",
        password: "12345678",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.data.token); // Assuming a token is returned on successful login
        token = res.body.data.token; // Store the token for later use
        done();
      });
  });

  it("should return error for invalid credentials", function (done) {
    supertest(app)
      .post("/api/login")
      .send({
        userName: "ggrvbm@gmail.com",
        password: "wrongpassword",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Calcuate Discounts", function () {
  it("should customer discount success", function (done) {
    supertest(app)
      .post("/api/calculate")
      .set("Authorization", `Bearer ${token}`) // Sending the token in Authorization header
      .send({
        item: "pen",
        category: "food",
        totalAmount: 100,
        userType: "customer",
        customerTenure: "5",
        originalCurrency: "INR",
        targetCurrency: "INR",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.status == 200);

        assert(res.body.data.payableAmount == 90);
        done();
      });
  });

  it("should employee discount success", function (done) {
    supertest(app)
      .post("/api/calculate")
      .set("Authorization", `Bearer ${token}`) // Sending the token in Authorization header
      .send({
        item: "pen",
        category: "food",
        totalAmount: 100,
        userType: "employee",
        customerTenure: "5",
        originalCurrency: "INR",
        targetCurrency: "INR",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.data.payableAmount == 65);
        done();
      });
  });

  it("should affiliate discount success", function (done) {
    supertest(app)
      .post("/api/calculate")
      .set("Authorization", `Bearer ${token}`) // Sending the token in Authorization header
      .send({
        item: "pen",
        category: "food",
        totalAmount: 100,
        userType: "affiliate",
        customerTenure: "5",
        originalCurrency: "INR",
        targetCurrency: "INR",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert(res.body.data.payableAmount == 85);
        done();
      });
  });
});
