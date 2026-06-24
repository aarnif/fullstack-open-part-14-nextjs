import { db } from "../../db";

export const getUsers = async () => db.query.users.findMany();
