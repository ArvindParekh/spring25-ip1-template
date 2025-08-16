import express, { Response, Router } from 'express';
import { UserRequest, User, UserCredentials, UserByUsernameRequest } from '../types/types';
import {
  deleteUserByUsername,
  getUserByUsername,
  loginUser,
  saveUser,
  updateUser,
} from '../services/user.service';

const userController = () => {
  const router: Router = express.Router();

  /**
   * Validates that the request body contains all required fields for a user.
   * @param req The incoming request containing user data.
   * @returns `true` if the body contains valid user fields; otherwise, `false`.
   */
  const isUserBodyValid = (req: UserRequest): boolean => {
    const { username, password } = req.body;
    return username !== undefined && password !== undefined;
  };
  // TODO: Task 1 - Implement the isUserBodyValid function

  /**
   * Handles the creation of a new user account.
   * @param req The request containing username and password in the body.
   * @param res The response, either returning the created user or an error.
   * @returns A promise resolving to void.
   */
  const createUser = async (req: UserRequest, res: Response): Promise<void> => {
    // TODO: Task 1 - Implement the createUser function
    const { username, password } = req.body;

    if (!isUserBodyValid(req)) {
      res.status(400).send('Invalid user body');
      return;
    }

    try {
      const newUser: User = { username, password, dateJoined: new Date() };
      const user = await saveUser(newUser);
      if ('error' in user) {
        res.status(400).send(user.error);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  /**
   * Handles user login by validating credentials.
   * @param req The request containing username and password in the body.
   * @param res The response, either returning the user or an error.
   * @returns A promise resolving to void.
   */
  const userLogin = async (req: UserRequest, res: Response): Promise<void> => {
    // TODO: Task 1 - Implement the userLogin function
    const { username, password } = req.body;

    if (!isUserBodyValid(req)) {
      res.status(400).send('Invalid user body');
      return;
    }

    try {
      const credentials: UserCredentials = { username, password };
      const user = await loginUser(credentials);
      if ('error' in user) {
        res.status(400).send(user.error);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  /**
   * Retrieves a user by their username.
   * @param req The request containing the username as a route parameter.
   * @param res The response, either returning the user or an error.
   * @returns A promise resolving to void.
   */
  const getUser = async (req: UserByUsernameRequest, res: Response): Promise<void> => {
    // TODO: Task 1 - Implement the getUser function
    const { username } = req.params;

    try {
      const user = await getUserByUsername(username);
      if ('error' in user) {
        res.status(400).send(user.error);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  /**
   * Deletes a user by their username.
   * @param req The request containing the username as a route parameter.
   * @param res The response, either the successfully deleted user object or returning an error.
   * @returns A promise resolving to void.
   */
  const deleteUser = async (req: UserByUsernameRequest, res: Response): Promise<void> => {
    // TODO: Task 1 - Implement the deleteUser function
    const { username } = req.params;

    try {
      const user = await deleteUserByUsername(username);
      if ('error' in user) {
        res.status(400).send(user.error);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  /**
   * Resets a user's password.
   * @param req The request containing the username and new password in the body.
   * @param res The response, either the successfully updated user object or returning an error.
   * @returns A promise resolving to void.
   */
  const resetPassword = async (req: UserRequest, res: Response): Promise<void> => {
    // TODO: Task 1 - Implement the resetPassword function
    const { username, password } = req.body;

    if (!isUserBodyValid(req)) {
      res.status(400).send('Invalid user body');
      return;
    }

    try {
      const user = await updateUser(username, { password });
      if ('error' in user) {
        res.status(400).send(user.error);
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  };

  // Define routes for the user-related operations.
  // TODO: Task 1 - Add appropriate HTTP verbs and endpoints to the router
  router.post('/signup', createUser);
  router.post('/login', userLogin);
  router.get('/getUser/:username', getUser);
  router.delete('/deleteUser/:username', deleteUser);
  router.patch('/resetPassword', resetPassword);

  return router;
};

export default userController;
