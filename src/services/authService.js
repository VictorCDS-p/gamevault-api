import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";
import { generateToken } from "../utils/jwt.js";

export const authService = {

  async register({ username, email, password }) {

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword
    });

    return user;

  },

  async login({ email, password }) {

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user);

    return {
      user,
      token
    };

  }

};