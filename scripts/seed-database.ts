import { config } from "dotenv";
import mongoose from "mongoose";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

// Load environment variables
config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}

const sampleUsers = [
  {
    name: "Alex Johnson",
    username: "alexj_dev",
    email: "alex.johnson@techcorp.com",
    bio: "Full-stack developer with 5+ years experience in React, Node.js, and MongoDB. Love solving complex problems and mentoring junior developers.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    location: "San Francisco, CA",
    portfolio: "https://alexjohnson.dev",
    reputation: 1250,
  },
  {
    name: "Sarah Chen",
    username: "sarah_codes",
    email: "sarah.chen@startup.io",
    bio: "Frontend specialist passionate about React, TypeScript, and modern web technologies. Building beautiful UIs that users love.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    location: "Seattle, WA",
    portfolio: "https://sarahchen.dev",
    reputation: 890,
  },
  {
    name: "Michael Rodriguez",
    username: "mike_backend",
    email: "m.rodriguez@cloudtech.com",
    bio: "Backend engineer specializing in Node.js, Python, and microservices architecture. 8 years of experience building scalable systems.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    location: "Austin, TX",
    portfolio: "https://mikecode.dev",
    reputation: 2150,
  },
  {
    name: "Emily Davis",
    username: "emily_mobile",
    email: "emily.davis@mobileapp.com",
    bio: "Mobile app developer with expertise in React Native and Flutter. Creating cross-platform apps that perform beautifully.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    location: "New York, NY",
    portfolio: "https://emilydavis.dev",
    reputation: 675,
  },
  {
    name: "David Kim",
    username: "david_devops",
    email: "david.kim@cloudops.io",
    bio: "DevOps engineer passionate about automation, CI/CD, and cloud infrastructure. AWS and Docker enthusiast.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    location: "Portland, OR",
    portfolio: "https://davidkim.tech",
    reputation: 1420,
  },
];

const sampleTags = [
  { name: "javascript", questions: 15 },
  { name: "react", questions: 12 },
  { name: "typescript", questions: 8 },
  { name: "nodejs", questions: 10 },
  { name: "mongodb", questions: 6 },
  { name: "python", questions: 7 },
  { name: "nextjs", questions: 9 },
  { name: "css", questions: 5 },
  { name: "html", questions: 4 },
  { name: "express", questions: 6 },
  { name: "docker", questions: 3 },
  { name: "aws", questions: 4 },
  { name: "git", questions: 3 },
  { name: "api", questions: 8 },
  { name: "database", questions: 5 },
];

const sampleQuestions = [
  {
    title: "How to optimize React component re-renders?",
    content: `I'm working on a large React application and noticing performance issues with unnecessary re-renders. I have a component that renders a list of items, and every time the parent state updates, all child components re-render even when their props haven't changed.

Here's my current code:

\`\`\`jsx
const ItemList = ({ items, onUpdate }) => {
  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onUpdate={onUpdate} />
      ))}
    </div>
  );
};
\`\`\`

What are the best practices to prevent unnecessary re-renders and improve performance?`,
    tags: ["react", "javascript", "performance"],
    views: 234,
    upvotes: 15,
    downvotes: 1,
    answers: 3,
  },
  {
    title: "Next.js API routes vs Express.js - When to use which?",
    content: `I'm building a full-stack application and trying to decide between using Next.js API routes or setting up a separate Express.js server for my backend.

My application needs:
- User authentication
- File uploads
- Real-time chat functionality
- Database operations
- Third-party API integrations

What are the pros and cons of each approach? When should I choose Next.js API routes over Express.js and vice versa?`,
    tags: ["nextjs", "express", "nodejs", "api"],
    views: 187,
    upvotes: 12,
    downvotes: 0,
    answers: 2,
  },
  {
    title: "MongoDB aggregation pipeline for complex queries",
    content: `I need to create a complex aggregation pipeline in MongoDB to generate analytics data. I have collections for users, orders, and products, and I need to:

1. Group orders by month
2. Calculate total revenue per month
3. Find the most popular products
4. Include user demographics

Here's my current attempt:

\`\`\`javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  }
  // ... more stages
])
\`\`\`

Can someone help me optimize this query and add the missing stages?`,
    tags: ["mongodb", "database", "aggregation"],
    views: 156,
    upvotes: 8,
    downvotes: 0,
    answers: 2,
  },
  {
    title: "TypeScript generic constraints with React components",
    content: `I'm trying to create a reusable React component with TypeScript that accepts different data types but enforces certain properties.

\`\`\`typescript
interface BaseItem {
  id: string;
  name: string;
}

interface TableProps<T extends BaseItem> {
  data: T[];
  onSelect: (item: T) => void;
  columns: Array<keyof T>;
}
\`\`\`

The issue is that I want to ensure type safety while keeping the component flexible. How can I properly type this component to get good IntelliSense and type checking?`,
    tags: ["typescript", "react", "generics"],
    views: 298,
    upvotes: 22,
    downvotes: 2,
    answers: 4,
  },
  {
    title: "Docker multi-stage builds for Node.js applications",
    content: `I'm trying to optimize my Docker images for a Node.js application. Currently, my image size is quite large (~800MB) and I've heard about multi-stage builds.

Current Dockerfile:
\`\`\`dockerfile
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

How can I implement multi-stage builds to reduce the image size and improve security?`,
    tags: ["docker", "nodejs", "deployment"],
    views: 145,
    upvotes: 9,
    downvotes: 0,
    answers: 1,
  },
  {
    title: "Implementing JWT authentication with refresh tokens",
    content: `I'm building an authentication system and want to implement JWT tokens with refresh token rotation for better security.

My current approach:
1. Login returns access token (15min) + refresh token (7 days)
2. Access token used for API calls
3. When access token expires, use refresh token to get new tokens

Questions:
- Where should I store refresh tokens securely?
- How to handle token rotation?
- Best practices for logout and token revocation?

Any code examples would be greatly appreciated!`,
    tags: ["authentication", "jwt", "security", "nodejs"],
    views: 312,
    upvotes: 18,
    downvotes: 1,
    answers: 3,
  },
];

const sampleAnswers = [
  {
    content: `Great question! Here are several techniques to optimize React re-renders:

## 1. Use React.memo()
\`\`\`jsx
const Item = React.memo(({ item, onUpdate }) => {
  return <div>{item.name}</div>;
});
\`\`\`

## 2. Use useCallback for functions
\`\`\`jsx
const ItemList = ({ items, onUpdate }) => {
  const handleUpdate = useCallback((id, data) => {
    onUpdate(id, data);
  }, [onUpdate]);

  return (
    <div>
      {items.map(item => (
        <Item key={item.id} item={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
};
\`\`\`

## 3. Split your state
Instead of one large state object, split it into smaller pieces so only relevant components re-render.

These optimizations should significantly improve your app's performance!`,
    upvotes: 12,
    downvotes: 0,
  },
  {
    content: `For your use case, I'd recommend a **hybrid approach**:

## Use Next.js API routes for:
- Simple CRUD operations
- Authentication endpoints
- File uploads (with limitations)
- Quick prototyping

## Use Express.js when you need:
- Complex middleware chains
- Real-time features (Socket.io)
- Heavy file processing
- Microservices architecture

For real-time chat, you'll definitely want Express.js with Socket.io. You can run both side by side - Next.js for your main app and Express for specific features.`,
    upvotes: 8,
    downvotes: 0,
  },
  {
    content: `Here's the complete aggregation pipeline for your analytics:

\`\`\`javascript
db.orders.aggregate([
  // Join with products
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  // Join with users
  {
    $lookup: {
      from: "users",
      localField: "userId", 
      foreignField: "_id",
      as: "user"
    }
  },
  // Unwind arrays
  { $unwind: "$product" },
  { $unwind: "$user" },
  // Group by month and calculate metrics
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalRevenue: { $sum: "$product.price" },
      orderCount: { $sum: 1 },
      popularProducts: {
        $push: {
          productId: "$product._id",
          productName: "$product.name",
          price: "$product.price"
        }
      }
    }
  },
  // Sort by date
  {
    $sort: { "_id.year": 1, "_id.month": 1 }
  }
])
\`\`\`

This should give you the monthly analytics you need!`,
    upvotes: 6,
    downvotes: 0,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Question.deleteMany({}),
      Tag.deleteMany({}),
      Answer.deleteMany({}),
    ]);
    console.log("Cleared existing data");

    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`Created ${createdUsers.length} users`);

    // Create tags
    const createdTags = await Tag.insertMany(sampleTags);
    console.log(`Created ${createdTags.length} tags`);

    // Create questions with proper references
    const questionsWithRefs = sampleQuestions.map((question, index) => ({
      ...question,
      author: createdUsers[index % createdUsers.length]._id,
      tags: question.tags
        .map((tagName) => {
          const tag = createdTags.find((t) => t.name === tagName);
          return tag?._id;
        })
        .filter(Boolean),
    }));

    const createdQuestions = await Question.insertMany(questionsWithRefs);
    console.log(`Created ${createdQuestions.length} questions`);

    // Create answers
    const answersWithRefs = sampleAnswers.map((answer, index) => ({
      ...answer,
      author: createdUsers[(index + 1) % createdUsers.length]._id,
      question: createdQuestions[index % createdQuestions.length]._id,
    }));

    const createdAnswers = await Answer.insertMany(answersWithRefs);
    console.log(`Created ${createdAnswers.length} answers`);

    console.log("✅ Database seeded successfully!");
    console.log("\n📊 Summary:");
    console.log(`👥 Users: ${createdUsers.length}`);
    console.log(`❓ Questions: ${createdQuestions.length}`);
    console.log(`🏷️  Tags: ${createdTags.length}`);
    console.log(`💬 Answers: ${createdAnswers.length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedDatabase();
