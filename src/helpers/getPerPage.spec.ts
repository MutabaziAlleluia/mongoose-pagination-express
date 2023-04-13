import { expect } from "chai";
import { Request } from "express";
import { getPerPage } from "./getPerPage";

describe("getPerPage", () => {
  it("should return default per_page if query parameter is not present", () => {
    const req: Request = {
      query: {},
    } as Request;
    expect(getPerPage(req, 15)).to.equal(15);
  });

  it("should return parsed per_page if query parameter is present", () => {
    const req = {
      query: {
        per_page: "20",
      },
    } as any as Request;
    expect(getPerPage(req, 15)).to.equal(20);
  });

  it("should return default per_page if query parameter is not a number", () => {
    const req = {
      query: {
        per_page: "not a number",
      },
    } as any as Request;
    expect(getPerPage(req, 15)).to.equal(15);
  });
});
