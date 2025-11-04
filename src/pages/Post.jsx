import {
  Client,
  Databases,
  Storage,
  ID,
  Query,
  Permission,
  Role,
} from "appwrite";
import conf from "../conf/conf.js";

class Service {
  client = new Client();
  databases;
  buckets;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.buckets = new Storage(this.client);
  }

  // ✅ Create new post
  async createPost({ title, slug, content, featuredimage, status, userid }) {
    try {
      const doc = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        { title, content, featuredimage, status, userid, slug }
      );
      return doc;
    } catch (error) {
      console.error("CreatePost ERROR:", error);
      throw error;
    }
  }

  // ✅ Update post
  async updatePost(id, data) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id,
        data
      );
    } catch (error) {
      console.error("UpdatePost ERROR:", error);
      return null;
    }
  }

  // ✅ Get post by id
  async getPost(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.error("getPost ERROR:", error);
      return null;
    }
  }

  // ✅ Get all active posts
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("getAllPost ERROR:", error);
      return null;
    }
  }

  // ✅ Upload image file
  async uploadfile(file, userId) {
    try {
      const uploaded = await this.buckets.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId)),
        ]
      );
      return uploaded;
    } catch (error) {
      console.error("Upload ERROR:", error);
      return null;
    }
  }

  // ✅ Delete image file
  async deleteFile(fileId) {
    try {
      return await this.buckets.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("DeleteFile ERROR:", error);
      return null;
    }
  }

  // ✅ Delete post
  async deletePost(id) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.error("DeletePost ERROR:", error);
      return null;
    }
  }

  // ✅ Get image preview URL
  getFilePreview(fileId) {
    if (!fileId) return null;
    try {
      return this.buckets.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Preview ERROR:", error);
      return null;
    }
  }
}

const service = new Service();
export default service;
