# Branding Catalyst - Employee Management System

## 🚀 Complete Setup Guide

### Backend Server Setup

#### 1. Set Up MongoDB Atlas (Cloud Database)

**Step 1: Create a MongoDB Atlas Account**
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up for a free account or log in

**Step 2: Create a Cluster**
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click "Create Cluster"

**Step 3: Configure Database Access**
1. Go to "Database Access" in the sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Read and write to any database"
5. Click "Add User"

**Step 4: Configure Network Access**
1. Go to "Network Access" in the sidebar
2. Click "Add IP Address"
3. Either add your current IP or click "Allow Access from Anywhere" (0.0.0.0/0) for development
4. Click "Confirm"

**Step 5: Get Your Connection String**
1. Go to "Database" in the sidebar
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

#### 2. Install Server Dependencies

```bash
cd server
npm install
```

#### 3. Configure Environment

Update the `.env` file with your MongoDB Atlas connection string:
```
PORT=5000

# MongoDB Atlas Connection
# Replace with your actual MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/branding_catalyst?retryWrites=true&w=majority&appName=BrandingCatalyst

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2025
JWT_EXPIRE=7d
NODE_ENV=development
```

**⚠️ Important:** Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your actual MongoDB Atlas credentials!

#### 4. Seed the Database

This creates admin and employee accounts with sample data:

```bash
npm run seed
```

**Default Login Credentials:**

**Admin:**
- Employee ID: `ADMIN001`
- Password: `admin123`

**Employees:**
- Employee ID: `EMP001`, `EMP002`, `EMP003`, `EMP004`
- Password: `password123`

#### 5. Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:5000`

**API Health Check:**
```bash
curl http://localhost:5000/api/health
```

---

### Frontend Setup

#### 1. Install Frontend Dependencies

```bash
# From project root
npm install
```

#### 2. Start Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📊 System Features

### Admin Dashboard
- **Overview**: Real-time statistics and analytics
- **Task Management**: Create, assign, update, and delete tasks
- **Project Management**: Create projects and assign team members
- **Employee Management**: 
  - View all employees in a comprehensive table
  - **Add new employees** with Employee ID, name, email, password, department, and position
  - **Reset passwords** for any employee account
  - **Delete employees** from the system (prevents deletion of admin accounts)
- **Activity Feed**: Track all system activities

### Employee Dashboard
- **Kanban Board**: Visual task management (To Do, In Progress, Review, Completed)
- **Task Details**: View full task information with comments
- **Status Updates**: Drag and drop or dropdown to update task status
- **Personal Activity**: Track your own task progress

---

## 🔐 Authentication System

### Login Flow
1. Click "Employee Login" button in footer
2. Select role (Admin or Employee)
3. Enter credentials
4. Redirected to appropriate dashboard

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control

---

## 📁 Project Structure

```
bcat1app/
├── server/
│   ├── models/           # MongoDB schemas
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Project.js
│   │   └── Activity.js
│   ├── routes/           # API endpoints
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── projects.js
│   │   ├── users.js
│   │   └── activity.js
│   ├── middleware/       # Auth middleware
│   │   └── auth.js
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeder
│   └── package.json
├── src/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── components/
│   │   └── EmployeeLoginModal.tsx
│   └── pages/
│       ├── AdminDashboard.tsx
│       └── EmployeeDashboard.tsx
└── index.tsx             # Main app with routing
```

---

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with employee ID and password
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get all tasks (filtered by role)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task (Admin only)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin only)
- `POST /api/tasks/:id/comments` - Add comment to task

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (Admin only)
- `PUT /api/projects/:id` - Update project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/employees` - Get all employees (Admin only)
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new employee (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `PUT /api/users/:id/password` - Update user password (Admin only)
- `DELETE /api/users/:id` - Delete employee (Admin only)

### Activity
- `GET /api/activity` - Get activity feed

---

## 🧪 Testing the System

### 1. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 2. Login as Admin

1. Go to `http://localhost:5173`
2. Scroll to footer
3. Click "Employee Login"
4. Select "Admin Login"
5. Enter `ADMIN001` / `admin123`

### 3. Login as Employee

1. Use credentials `EMP001` / `password123`
2. View your assigned tasks
3. Update task status
4. Move tasks through Kanban board

---

## 🔄 Development Workflow

### Add New Employee

Use MongoDB shell:
```javascript
db.users.insertOne({
  employeeId: "EMP005",
  name: "New Employee",
  email: "new@brandingcatalyst.com",
  password: "$2a$10$...", // Use bcrypt to hash
  role: "employee",
  department: "Engineering",
  position: "Developer",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the seed script as a template.

### Reset Database

```bash
cd server
npm run seed
```

This will clear and repopulate all data.

---

## 🚨 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
brew services start mongodb-community
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
lsof -ti:5000 | xargs kill -9
```

### CORS Error

Make sure backend server is running and frontend is making requests to `http://localhost:5000`

---

## 📈 Future Enhancements

- [ ] File attachments for tasks
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics and reports
- [ ] Email notifications
- [ ] Task templates
- [ ] Time tracking
- [ ] Calendar integration
- [ ] Mobile app

---

## 📝 Notes

- This system uses **local MongoDB** - no cloud setup required
- All passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- Employee IDs are case-insensitive
- Tasks are automatically filtered by user role

---

## 🎉 Deployment Ready

For production deployment:

1. Update `.env` with production MongoDB URI
2. Change JWT_SECRET to a secure random string
3. Set NODE_ENV=production
4. Build frontend: `npm run build`
5. Deploy backend to Heroku/Railway/DigitalOcean
6. Deploy frontend to Netlify/Vercel

---

**Built with:** React, TypeScript, Express, MongoDB, Framer Motion

**Created:** December 2025
