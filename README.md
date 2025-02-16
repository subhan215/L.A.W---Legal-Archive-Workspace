# 📜 L.A.W. - Legal Archive Workspace

L.A.W. is a **secure and efficient platform** for managing legal case collections and documents. It enables **users to upload, organize, and share legal documents** while integrating with **MongoDB Atlas** and **Cloudinary** for storage.

---

## 🚀 Features
- 🔐 **User Authentication** (JWT-based login & register)
- 📂 **Upload & Manage Legal Documents** (Supports PDFs, DOCX)
- 📖 **Search & View Collections** (Public and Private)
- 📤 **Download Legal Documents** (For authorized users)
- ☁️ **Cloudinary Integration** (For secure document storage)
- 🗄 **MongoDB Atlas** (Remote database for scalability)
- 🐳 **Docker Support** (Easily deployable using `docker-compose`)

---

## 🛠️ Tech Stack
| Technology       | Usage             |
|-----------------|------------------|
| **Next.js**     | Frontend & API   |
| **MongoDB Atlas** | Database        |
| **Cloudinary**  | Document Storage |
| **Tailwind CSS** | UI Styling      |
| **JWT (JSON Web Token)** | Authentication |
| **Docker**      | Containerization |
| **Docker Compose** | Multi-container setup |

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/subhan215/L.A.W---Legal-Archive-Workspace.git
cd L.A.W---Legal-Archive-Workspace



📦 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/subhan215/L.A.W---Legal-Archive-Workspace.git
cd L.A.W---Legal-Archive-Workspace

2️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

MONGO_URL=mongodb+srv://your_mongo_user:your_mongo_pass@cluster0.mongodb.net/law
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_super_secret_key

3️⃣ Run with Docker (Recommended)

docker-compose up --build

App will be live at → http://localhost:3000

Check running containers → docker ps

4️⃣ Run Manually (Without Docker)

npm install
npm run dev

Visit: http://localhost:3000

📝 Usage Guide

🛂 User Authentication

Register → /api/auth/register

Login → /api/auth/login

Fetch User Info → /api/auth/me

📁 Collections Management

View All Collections → /api/collections

View Specific Collection → /api/collections/{id}

Create Collection → /api/collections (POST)

Upload Document → /api/upload (POST)

🔄 Uploading Documents

Supported Formats → PDF, DOCX

Stored on Cloudinary

🛠️ API Endpoints (Postman Collection)

🔗 Postman Collection Link:https://tweetandtube.postman.co/workspace/TweetANDTube~65649db1-febf-4cbf-b08b-6483945d94bf/collection/36693995-57066df8-5e4f-4f14-bd37-12a8a150d0ca?action=share&creator=36693995

🛠️ Docker Commands

✔ Run cleanup before retrying:

docker-compose down --rmi all
docker system prune -a -f
docker-compose up --build


