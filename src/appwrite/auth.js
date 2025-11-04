// Import Appwrite SDK and config
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
  // ✅ lowercase 'client' not 'Client'
  client = new Client();
  account;

  constructor() {
    // ✅ Properly initialize client
    this.client
      .setEndpoint(conf.appwriteUrl) // Your Appwrite URL
      .setProject(conf.appwriteProjectId); // Your Project ID

    // ✅ Create Account instance
    this.account = new Account(this.client);
  }

  // Create a new account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      console.error("Appwrite createAccount error:", error.message);
      throw error;
    }
  }

  // Login user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite login error:", error.message);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite getCurrentUser error:", error.message);
      return null;
    }
  }

  // Logout user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("Appwrite logout error:", error.message);
    }
  }
}

// ✅ Create and export single instance
const authService = new AuthService();
export default authService;
