import UserModel from '../models/users.model';
import { SafeUser, User, UserCredentials, UserResponse } from '../types/types';

/**
 * Saves a new user to the database.
 *
 * @param {User} user - The user object to be saved, containing user details like username, password, etc.
 * @returns {Promise<UserResponse>} - Resolves with the saved user object (without the password) or an error message.
 */
export const saveUser = async (user: User): Promise<UserResponse> => {
  // TODO: Task 1 - Implement the saveUser function. Refer to other service files for guidance.
  try {
    const newUser = await UserModel.create(user);
    const safeUser = await UserModel.findById(newUser._id).select('-password');
    return safeUser as SafeUser;
  } catch (error) {
    return { error: 'Error when saving user' };
  }
};

/**
 * Retrieves a user from the database by their username.
 *
 * @param {string} username - The username of the user to find.
 * @returns {Promise<UserResponse>} - Resolves with the found user object (without the password) or an error message.
 */
export const getUserByUsername = async (username: string): Promise<UserResponse> => {
  // TODO: Task 1 - Implement the getUserByUsername function. Refer to other service files for guidance.
  try {
    const user = await UserModel.findOne({ username }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user as SafeUser;
  } catch (error) {
    return { error: 'Error when getting user by username' };
  }
};

/**
 * Authenticates a user by verifying their username and password.
 *
 * @param {UserCredentials} loginCredentials - An object containing the username and password.
 * @returns {Promise<UserResponse>} - Resolves with the authenticated user object (without the password) or an error message.
 */
export const loginUser = async (loginCredentials: UserCredentials): Promise<UserResponse> => {
  // TODO: Task 1 - Implement the loginUser function. Refer to other service files for guidance.
  try {
    const user = await UserModel.findOne({
      username: loginCredentials.username,
      password: loginCredentials.password,
    }).select('-password');
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user as SafeUser;
  } catch (error) {
    return { error: 'Error when logging in user' };
  }
};

/**
 * Deletes a user from the database by their username.
 *
 * @param {string} username - The username of the user to delete.
 * @returns {Promise<UserResponse>} - Resolves with the deleted user object (without the password) or an error message.
 */
export const deleteUserByUsername = async (username: string): Promise<UserResponse> => {
  // TODO: Task 1 - Implement the deleteUserByUsername function. Refer to other service files for guidance.
  try {
    const user = await UserModel.findOneAndDelete({ username }).select('-password');
    if (!user) {
      throw new Error('User not found');
    }
    return user as SafeUser;
  } catch (error) {
    return { error: 'Error when deleting user by username' };
  }
};

/**
 * Updates user information in the database.
 *
 * @param {string} username - The username of the user to update.
 * @param {Partial<User>} updates - An object containing the fields to update and their new values.
 * @returns {Promise<UserResponse>} - Resolves with the updated user object (without the password) or an error message.
 */
export const updateUser = async (
  username: string,
  updates: Partial<User>,
): Promise<UserResponse> => {
  // TODO: Task 1 - Implement the updateUser function. Refer to other service files for guidance.
  try {
    const user = await UserModel.findOneAndUpdate({ username }, updates, { new: true }).select(
      '-password',
    );
    if (!user) {
      throw new Error('User not found');
    }
    return user as SafeUser;
  } catch (error) {
    return { error: 'Error when updating user' };
  }
};
