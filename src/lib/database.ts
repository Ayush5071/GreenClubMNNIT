// MongoDB database utility using Mongoose
import connectToDatabase from './mongodb';
import { User, Problem, IUser, IProblem } from './models';

export class Database {
  // Initialize database connection
  static async connect() {
    await connectToDatabase();
  }

  // User operations
  static async getUsers(): Promise<IUser[]> {
    await this.connect();
    return await User.find({}).sort({ createdAt: -1 });
  }

  static async getUserByEmail(email: string): Promise<IUser | null> {
    await this.connect();
    return await User.findOne({ email: email.toLowerCase() });
  }

  static async getUserById(id: string): Promise<IUser | null> {
    await this.connect();
    return await User.findById(id);
  }

  static async createUser(userData: Omit<IUser, '_id' | 'joinedAt' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    await this.connect();
    const newUser = new User({
      ...userData,
      email: userData.email.toLowerCase(),
      joinedAt: new Date(),
    });
    return await newUser.save();
  }

  static async updateUser(email: string, updates: Partial<IUser>): Promise<IUser | null> {
    await this.connect();
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return updatedUser;
  }

  static async updateUserById(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    await this.connect();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return updatedUser;
  }

  static async deleteUser(email: string): Promise<boolean> {
    await this.connect();
    const result = await User.deleteOne({ email: email.toLowerCase() });
    return result.deletedCount > 0;
  }

  // Problem operations
  static async getProblems(): Promise<IProblem[]> {
    await this.connect();
    return await Problem.find({}).sort({ createdAt: -1 });
  }

  static async getProblemById(id: string): Promise<IProblem | null> {
    await this.connect();
    return await Problem.findById(id);
  }

  static async getProblemsByUser(userEmail: string): Promise<IProblem[]> {
    await this.connect();
    return await Problem.find({ reportedBy: userEmail }).sort({ createdAt: -1 });
  }

  static async getProblemsByStatus(status: string): Promise<IProblem[]> {
    await this.connect();
    return await Problem.find({ status }).sort({ createdAt: -1 });
  }

  static async getProblemsByCategory(category: string): Promise<IProblem[]> {
    await this.connect();
    return await Problem.find({ category }).sort({ createdAt: -1 });
  }

  static async createProblem(problemData: Omit<IProblem, '_id' | 'createdAt' | 'updatedAt'>): Promise<IProblem> {
    await this.connect();
    const newProblem = new Problem({
      ...problemData,
      comments: problemData.comments || [],
      tags: problemData.tags || [],
      attachments: problemData.attachments || [],
    });
    return await newProblem.save();
  }

  static async updateProblem(id: string, updates: Partial<IProblem>): Promise<IProblem | null> {
    await this.connect();
    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true }
    );
    return updatedProblem;
  }

  static async deleteProblem(id: string): Promise<boolean> {
    await this.connect();
    const result = await Problem.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Comment operations
  static async addComment(problemId: string, comment: { text: string; author: string }): Promise<IProblem | null> {
    await this.connect();
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      { 
        $push: { 
          comments: { 
            ...comment, 
            createdAt: new Date() 
          } 
        },
        updatedAt: new Date()
      },
      { new: true }
    );
    return updatedProblem;
  }

  // Statistics
  static async getUserStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    memberUsers: number;
  }> {
    await this.connect();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const memberUsers = await User.countDocuments({ role: 'member' });
    
    return {
      totalUsers,
      activeUsers,
      adminUsers,
      memberUsers,
    };
  }

  static async getProblemStats(): Promise<{
    totalProblems: number;
    openProblems: number;
    inProgressProblems: number;
    resolvedProblems: number;
    closedProblems: number;
  }> {
    await this.connect();
    const totalProblems = await Problem.countDocuments();
    const openProblems = await Problem.countDocuments({ status: 'open' });
    const inProgressProblems = await Problem.countDocuments({ status: 'in-progress' });
    const resolvedProblems = await Problem.countDocuments({ status: 'resolved' });
    const closedProblems = await Problem.countDocuments({ status: 'closed' });
    
    return {
      totalProblems,
      openProblems,
      inProgressProblems,
      resolvedProblems,
      closedProblems,
    };
  }
}
