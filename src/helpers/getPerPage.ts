import { Request } from "express";

export function getPerPage(req: Request, defaultPerPage: number = 15) {
  return parseInt(req.query.per_page as string) || defaultPerPage;
}
