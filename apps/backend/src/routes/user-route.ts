import express, {Router, Request, Response} from "express";
import { parseCSV} from "common/src/parser.ts";
import PrismaClient from "../bin/database-connection.ts";

const router: Router = express.Router();

interface user {
  Username:string,
  Password:string
}

router.post("/", async (req: Request, res: Response) => {
  try {
    // Parse the CSV string to an array of CSVRow objects
    const rowsUser = parseCSV(req.body["csvString"]);
    const transformedUser:user[] = rowsUser.map((row) => {
      const rowval = Object.values(row);
      return {
        Username:rowval[0],
        Password:rowval[1]
      };
    });

    await PrismaClient.user.createMany({data:transformedUser.map((self) => {
        return {
          Username:self.Username,
          Password:self.Password
        };}
      )
    });

    res.sendStatus(200);

  } catch (error) {
    console.error(`Error populating node data: ${error}`);
    res.sendStatus(500);
  }

});

router.get("/", async function (req: Request, res: Response) {
  try{
    //Currently sends entire user table to front end
    //Desired functionality: take a username, check if the password is correct, if it is send 200, if not send error
    const userCSV = await PrismaClient.user.findMany();
    res.send(userCSV);
  } catch (error){
    console.error(`Error exporting user data: ${error}`);
    res.sendStatus(500);
  }
  res.sendStatus(200);
});

export default router;
