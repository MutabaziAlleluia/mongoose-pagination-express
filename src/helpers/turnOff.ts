import { Request } from "express";

export const turnOff = (req: Request) => {
  return (
    req.query.pagination === "off" ||
    req.query.pagination === "false" ||
    req.query.pagination === "0"
  );
};
