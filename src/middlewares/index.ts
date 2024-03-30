import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "@src/db/users";

export async function isOwner(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    console.log(-1, req.identity);

    console.log(0, currentUserId, id);
    if (!currentUserId) {
      return res.sendStatus(403);
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const sessionToken = req.cookies["CODEKCV-AUTH"];

    if (!sessionToken) {
      return res.sendStatus(400);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    console.log(123, existingUser);

    if (!existingUser) {
      return res.sendStatus(400);
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
