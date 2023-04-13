import { Aggregate, Query } from "mongoose";
import { lastPage } from "./lastPage";

export interface Pagination<Doc> {
  from: any;
  to: any;
  per_page: any;
  total: number | any;
  current_page: number;
  prev_page?: number | null;
  next_page?: number | null;
  last_page: number | null;
  data: Doc[];
}

type PaginateQuery<Doc> = [
  isAggregate: false,
  builder: Query<any, Doc>,
  page: number,
  per_page: number
];
type PaginateAggregate<Doc> = [
  isAggregate: true,
  builder: Aggregate<Doc>,
  page: number,
  per_page: number
];
type Paginate<Doc> = PaginateQuery<Doc> | PaginateAggregate<Doc>;

export const paginate = async <Doc>(
  ...props: Paginate<Doc>
): Promise<Pagination<Doc>> => {
  const [isAggregate, builder, page, per_page] = props;
  let skip = (page - 1) * per_page;
  let count = 0;
  let res: any = null;

  if (isAggregate === false) {
    const total = builder.clone();
    count = await total.count();
    res = await builder.skip(skip).limit(per_page).exec();
  }

  if (isAggregate === true) {
    builder.facet({
      totalRecords: [
        {
          $count: "total",
        },
      ],
      data: [
        {
          $skip: skip,
        },
        {
          $limit: per_page,
        },
      ],
    });
    const __res = await builder.exec();
    count = (__res as any)?.[0]?.totalRecords?.[0]?.total || 0;
    res = (__res as any)?.[0]?.data;
  }

  return {
    from: skip <= count ? skip + 1 : null,
    to: count > skip + per_page ? skip + per_page : count,
    per_page: per_page,
    total: count,
    current_page: page,
    prev_page: page > 1 ? page - 1 : null,
    next_page: count > skip + per_page ? page + 1 : null,
    last_page: lastPage(per_page, count),
    data: res || [],
  };
};
