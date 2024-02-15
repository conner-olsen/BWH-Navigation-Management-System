import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";
import {ServiceRequest} from "common/interfaces/interfaces.ts";
const router: Router = express.Router();

router.patch("/", async (req: Request, res: Response) => {

  const srUpdate: ServiceRequest = req.body;


  try {
    res.send(srUpdate);
    const updatedRequest = await PrismaClient.serviceRequest.update({
      where: {id: srUpdate.id  },
      data: {
        status: srUpdate.status,
        employeeUser: srUpdate.employeeUser
      }
    });

    res.send(updatedRequest);

    res.sendStatus(200);
  } catch (error) {
    console.error(`Error updating ServiceRequest fields: ${error}`);
    res.sendStatus(500);
  }

});


export default router;
