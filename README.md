# 🧾 Resume Builder

A full-stack Resume Builder web application that lets users create, edit, and download professional resumes with live previews and secure authentication. 🚀 **Live Demo:** [resume-builder-frontend](https://resume-builder-frontend-45va.vercel.app/) | 🧠 **Backend API:** [API Link](https://resumebuilderbackend-z2zv.onrender.com/api) | 💻 **Backend Code:** [GitHub Repo](https://github.com/RaviPatel94/ResumeBuilderBackend)  

Frontend uses Next.js 15, TypeScript, Tailwind CSS, Redux Toolkit + Persist, and @react-pdf/renderer for PDF generation. Backend uses Express.js, JWT Authentication, Supabase, bcrypt.js, and is deployed on Render.  

Key features include user registration & login with JWT, real-time resume preview, PDF download, persistent user data with Supabase, and a responsive, minimalist UI.  

To run locally: Frontend → `cd frontend && npm install && npm run dev` (http://localhost:3000) | Backend → `cd backend && npm install && npm run dev` (http://localhost:5000)  

**API Endpoints:** POST `/api/auth/register` to register a new user, POST `/api/auth/login` to authenticate user, GET `/api/user/profile` to get user data (protected), GET `/api/projects/metadata` to get metadata for all projects, GET `/api/projects/:id` to get a project by ID, POST `/api/projects/` to create a project, PUT `/api/projects/:id` to update a project, DELETE `/api/projects/:id` to delete a project. **Base URL:** `https://resumebuilderbackend-z2zv.onrender.com/api`  

The app is deployed with the frontend on Vercel, backend on Render, and database on Supabase.

## 📦 Database Schema (Simplified)

**Users Table**  
- `id` (Primary Key)  
- `email` (Unique)  
- `password`  
- `projects_metadata` (JSON)  
- `created_at`  

**Projects Table**  
- `id` (Primary Key)  
- `user_id` (Foreign Key → Users.id)  
- `name`  
- `template`  
- `resume` (JSON)  
- `styles` (JSON)  
- `created_at`  
- `updated_at`  

**Relationships:**  
- Each project belongs to a user  
- Deleting a user deletes all their projects