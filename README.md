# CV Spark

CV Spark is an AI-powered resume builder application that allows users to create, edit, and download professional resumes with ease. It includes features like real-time ATS scoring, customizable templates, and a clean, user-friendly interface.

---

## **Features**

- Create, edit, and delete resumes with multiple templates
- Real-time ATS (Applicant Tracking System) score calculation
- Preview and download resumes as PDF
- Customizable color palettes and themes
- Structured input for work experience, education, skills, projects, certifications, and languages
- Responsive and interactive UI
- Role-specific keyword detection for better ATS optimization

---

## **Tech Stack**

- **Frontend:**
  - React.js
  - Tailwind CSS
  - Framer Motion (animations)
  - React Icons
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JWT authentication
- **Tools & Libraries:**
  - React Hook Form
  - Axios
  - React Router
  - Nodemon
  - dotenv
- **Deployment & DevOps:**
  - Git & GitHub
  - Vercel / Netlify (Frontend)
  - Heroku / Railway (Backend)
  - Environment variable management via `.env`

---

## **Project Setup**

Follow these steps to set up and run the project locally:

### **1. Clone the repository**
```bash
git clone

---Frontend Setup 
cd frontend
cd ai-spark
npm install
npm run dev

--Configure environment variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

---Backend Setup
cd backend
npm install
nodemon server.js

--Run the project

cd backend
npm run dev

cd ../frontend
npm start


--Folder Structure

cv-spark/
├── backend/          # Node.js backend with Express & MongoDB
├── frontend/         # React.js frontend with Tailwind CSS
├── .gitignore        # Ignored files
├── README.md         # Project documentation















