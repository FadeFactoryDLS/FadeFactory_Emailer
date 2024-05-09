import assert from "assert/strict";
import test from "node:test";
import dotenv from "dotenv";

dotenv.config();

// test("will pass", () => {
//   console.log("hello world");
// });

// test("will fail", () => {
//   throw new Error("fail");
// });

test("dotenv saved correctly", () => {
  const dotenv_variable = process.env.TESTING_VARIABLE;
  assert.equal(dotenv_variable, "test-passed");
});
