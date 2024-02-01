// import express, { Router, Request, Response } from "express";
// import { Prisma } from "database";
// import PrismaClient from "../bin/database-connection.ts";
//
// const router: Router = express.Router();
//
// router.post("/", async function (req: Request, res: Response) {
//   const nodeAttempt: Prisma.NodeCreateManyInput = req.body;
//   // Attempt to save the node
//   try {
//     // Attempt to create in the database
//     await PrismaClient.node.create({ data: nodeAttempt });
//     console.info("Successfully saved node attempt");
//   } catch (error) {
//     // Log any failures
//     console.error(
//       `Unable to save node attempt ${nodeAttempt}: ${error}`,
//     );
//     res.sendStatus(400);
//     return;
//   }
//
//   res.sendStatus(200);
// });
//
// export default router;
