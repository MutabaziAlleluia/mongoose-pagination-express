import { expect } from "chai";
import { lastPage } from "./lastPage";

describe("lastPage", () => {
  it("should return the correct value when count is a multiple of per_page", () => {
    expect(lastPage(10, 100)).to.equal(10);
  });

  it("should return the correct value when count is not a multiple of per_page", () => {
    expect(lastPage(10, 101)).to.equal(11);
  });

  it("should return 1 when per_page is greater than count", () => {
    expect(lastPage(20, 10)).to.equal(1);
  });
});
