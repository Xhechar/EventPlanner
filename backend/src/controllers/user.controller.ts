import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { userSchema } from "../validators/user.validators";
import { getIdFromToken } from "../middlewares/getIdFromToken";

let user_service = new UserService();
export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      let { error } = userSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message,
        });
      }

      console.log("running near response");

      let response = await user_service.registerUser(req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({
        error: error,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      let { error } = userSchema.validate(req.body);

      if (error) {
        return res.status(401).json({
          error: error.message,
        });
      }

      let user_id = getIdFromToken(req);

      if (user_id == "") {
        return res.status(501).json({
          error: "Could not get id from token headers",
        });
      }

      let response = await user_service.updateUser(user_id, req.body);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      let response = await user_service.getAllUsers();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      let user_id = getIdFromToken(req);

      if (!user_id) {
        return res.status(501).json({
          error: "Could not get id from token headers",
        });
      }

      let response = await user_service.getUserById(user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async getUserByRole(req: Request, res: Response) {
    try {
      let response = await user_service.getUserByRole();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async getAllUsersByDateCreated(req: Request, res: Response) {
    try {
      let response = await user_service.getAllUsersByDateCreated();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async updateRoleByAdmin(req: Request, res: Response) {
    try {
      let response = await user_service.updateRoleByAdmin(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async revertUserRole(req: Request, res: Response) {
    try {
      let response = await user_service.revertUserRole(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async updateAllUsersRoleByAdmin(req: Request, res: Response) {
    try {
      let response = await user_service.updateAllUsersRoleByAdmin();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async softDeleteUser(req: Request, res: Response) {
    try {
      let response = await user_service.softDeleteUser(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async retrieveDeletedUser(req: Request, res: Response) {
    try {
      let response = await user_service.retrieveDeletedUser(req.params.user_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async retrieveAllDeletedUsers(req: Request, res: Response) {
    try {
      let response = await user_service.retrieveAllDeletedUsers();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async getUsersByEventId(req: Request, res: Response) {
    try {
      let response = await user_service.getUsersByEventId(req.params.event_id);

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }

  async retrieveAllManagers(req: Request, res: Response) {
    try {
      let response = await user_service.retrieveAllManagers();

      return res.status(201).json(response);
    } catch (error) {
      return res.json({ error });
    }
  }
}
