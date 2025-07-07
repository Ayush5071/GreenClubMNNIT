import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    default: 'member',
  },
  loginCount: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Problem Schema
const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['environment', 'campus', 'awareness', 'research', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: true,
  },
  reportedBy: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    default: null,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  comments: [{
    text: String,
    author: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  attachments: [{
    name: String,
    url: String,
    type: String,
  }],
}, {
  timestamps: true,
});

// Export models
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Problem = mongoose.models.Problem || mongoose.model('Problem', problemSchema);

// TypeScript interfaces
export interface IUser {
  _id?: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  loginCount: number;
  lastLogin: Date;
  joinedAt: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProblem {
  _id?: string;
  title: string;
  description: string;
  category: 'environment' | 'campus' | 'awareness' | 'research' | 'other';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  reportedBy: string;
  assignedTo?: string;
  tags: string[];
  comments: {
    text: string;
    author: string;
    createdAt: Date;
  }[];
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
