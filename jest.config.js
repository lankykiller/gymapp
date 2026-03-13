const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  //preset: "ts-test",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};