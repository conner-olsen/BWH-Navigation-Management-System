import express, {Router, Request, Response} from "express";
import PrismaClient from "../bin/database-connection.ts";



const router: Router = express.Router();


router.post("/", async (req: Request, res: Response) => {

  try {
    const { name, nickname, user_metadata} = req.body;

    if (!name || !nickname || !user_metadata) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { firstname, lastname } = user_metadata;

    if (!firstname || !lastname) {
      return res.status(400).json({ error: 'First name and last name are required' });
    }

    // Store data in the database
    const createdUser = await PrismaClient.user.create({
      data: {
        Username: nickname,
      },
    });


    res.sendStatus(201).json(createdUser);



    // Store data in the database
    const createdEmployee = await PrismaClient.employee.create({
      data: {
        username: nickname,
        email: name,
        firstName: firstname,
        lastName: lastname,
      },
    });

    res.status(201).json(createdEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // Retrieve employee from the database
    const employee = await PrismaClient.employee.findUnique({
      where: {
        username: username,
      },
    });

    if (!employee) {
      return res.status(400).json({ error: 'Employee does not exist' });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('Error retrieving employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;
