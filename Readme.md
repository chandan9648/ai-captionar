🧠 AI-Captionar

A full-stack MERN-based web platform for uploading images and generating AI-powered captions. The platform supports user  authentication, caption history, and optional copy reports for generated captions.

🚀 Live Demo
COMING SOON

🧰 Tech Stack
Frontend:

React.js

Redux Toolkit

Tailwind CSS

Backend:

Node.js

Express.js

MongoDB

Multer (image upload)

JWT (Authentication)

GeminiAI API (for AI caption generation)

🎯 Key Features
✅ User Authentication (JWT-based)
✅ Image Upload (JPG, PNG, JPEG)
✅ AI-Powered Caption Generation (via GeminiAI API)
✅ Optional Multi-type Caption Support

🗂️ Folder Structure

/backend  
 ├── models/  
 ├── routes/  
 ├── middleware/  
 └── server.js  

/frontend  
 ├── src/  
 ├── components/  
 ├── pages/  
 ├── redux/  
 ├── services/  
 └── App.js  


🛠️ Installation & Setup

1. Clone the Repository

git clone https://github.com/chandan9648/ai-captionar.git
cd ai-captionar


Backend Setup

cd backend
npm install


Create a .env file:

PORT=3000
MONGO_URI=mongodb+srv://username:
JWT_SECRET=jwt_secret
GOOGLE_API_KEY=google_api_key
IMAGEKIT_PUBLIC_KEY=imagekit_public_key
IMAGEKIT_PRIVATE_KEY=imagekit_private_key
IMAGEKIT_URL_ENDPOINT=imagekit_url_endpoint


Run the backend:

npm run dev


Frontend Setup

cd frontend
npm install
npm start


📚 References

Gemini API Docs

Tailwind CSS Docs

MERN Authentication Guides

🙌 Acknowledgements
Inspired by modern AI-powered apps like Hugging Face’s image captioning tools. Built as a 10-week full-stack MERN capstone project.

📬 Contact
Developer: Chandan Chaudhary
Email: chandanchaudhary1710@gmail.com

GitHub: github.com/chandan9648
