import { expect } from "chai";
import { Aggregate, Query } from "mongoose";
import { paginate, Pagination } from "./paginate";

describe("paginate", () => {
  it("should return the correct pagination data for Query builder", async () => {
    const query: Query<any, any> = {
      clone: () => ({
        count: () => Promise.resolve(data.length),
      }),
      skip: () => ({
        limit: () => ({
          exec: () => Promise.resolve(data.slice(0, 2)),
        }),
      }),
    } as any as Query<any, any>;

    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const result: Pagination<any> = (await paginate(
      false,
      query,
      1,
      2
    )) as Pagination<any>;

    expect(result.current_page).to.equal(1);
    expect(result.per_page).to.equal(2);
    expect(result.total).to.equal(5);
    expect(result.last_page).to.equal(3);
    expect(result.data).to.deep.equal([{ id: 1 }, { id: 2 }]);
  });

  it("should return the correct pagination data for Aggregate builder", async () => {
    const aggregate: Aggregate<any[]> = {
      facet: () => ({}),
      exec: () =>
        Promise.resolve([
          {
            totalRecords: [
              {
                total: data.length,
              },
            ],
            data: data.slice(0, 2),
          },
        ]),
    } as any as Aggregate<any[]>;

    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    const result: Pagination<any> = (await paginate(
      true,
      aggregate,
      1,
      2
    )) as Pagination<any>;

    expect(result.current_page).to.equal(1);
    expect(result.per_page).to.equal(2);
    expect(result.total).to.equal(5);
    expect(result.last_page).to.equal(3);
    expect(result.data).to.deep.equal([{ id: 1 }, { id: 2 }]);
  });
});
