import { expect } from "chai";
import { Request } from "express";
import { turnOff } from "./turnOff";

describe("turnOff", () => {
  it("should return true if query parameter is 'off'", () => {
    const req = {
      query: {
        pagination: "off",
      },
    } as any as Request;
    expect(turnOff(req)).to.equal(true);
  });

  it("should return true if query parameter is 'false'", () => {
    const req = {
      query: {
        pagination: "false",
      },
    } as any as Request;
    expect(turnOff(req)).to.equal(true);
  });

  it("should return true if query parameter is '0'", () => {
    const req = {
      query: {
        pagination: "0",
      },
    } as any as Request;
    expect(turnOff(req)).to.equal(true);
  });

  it("should return false if query parameter is not present", () => {
    const req = {
      query: {},
    } as Request;
    expect(turnOff(req)).to.equal(false);
  });

  it("should return false if query parameter has a non-matching value", () => {
    const req = {
      query: {
        pagination: "on",
      },
    } as any as Request;
    expect(turnOff(req)).to.equal(false);
  });
});
