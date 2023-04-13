import { Request } from "express";

export function getPage(req: Request, defaultPage: number = 1) {
  return parseInt(req.query.page as string) || defaultPage;
}
