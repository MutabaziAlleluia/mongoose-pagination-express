import { expect } from "chai";
import { Request } from "express";
import { getPage } from "./getPage";

describe("getPage", () => {
  it("should return default page if query parameter is not present", () => {
    const req: Request = {
      query: {},
    } as Request;
    expect(getPage(req, 1)).to.equal(1);
  });

  it("should return parsed page if query parameter is present", () => {
    const req = {
      query: {
        page: "2",
      },
    } as any as Request;
    expect(getPage(req, 1)).to.equal(2);
  });

  it("should return default page if query parameter is not a number", () => {
    const req = {
      query: {
        page: "not a number",
      },
    } as any as Request;
    expect(getPage(req, 1)).to.equal(1);
  });
});
