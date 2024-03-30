import { register } from "@src/controllers/authentication";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/register", register);
};
