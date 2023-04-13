import { NextFunction, Request, Response } from "express";
import { Aggregate, Query } from "mongoose";
import { getPage } from "./helpers/getPage";
import { getPerPage } from "./helpers/getPerPage";
import { Pagination, paginate } from "./helpers/paginate";
import { turnOff } from "./helpers/turnOff";

declare module "mongoose" {
  export interface Query<
    ResultType,
    DocType,
    THelpers = {},
    RawDocType = DocType
  > {
    paginate: (per_page?: number | null) => Promise<Pagination<DocType>>;
  }

  export interface Aggregate<ResultType> {
    paginate: (per_page?: number | null) => Promise<Pagination<ResultType>>;
  }
}

export const pagination = (req: Request, res: Response, next: NextFunction) => {
  Query.prototype.paginate = function <Doc>(
    per_page?: number | null
  ): Promise<Pagination<Doc>> {
    let current_page = getPage(req);
    const turn_off = turnOff(req);

    if (turn_off) return this.exec();

    if (!per_page) per_page = getPerPage(req);
    else per_page = getPerPage(req, per_page);
    return paginate(false, this, current_page, per_page);
  };

  Aggregate.prototype.paginate = function <Doc>(
    per_page?: number | null
  ): Promise<Pagination<Doc>> {
    let current_page = getPage(req);
    const turn_off = turnOff(req);

    if (turn_off) return this.exec();

    if (!per_page) per_page = getPerPage(req);
    else per_page = getPerPage(req, per_page);
    return paginate(true, this, current_page, per_page);
  };

  next();
};
