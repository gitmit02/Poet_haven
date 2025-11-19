# Poet's Haven  

**A poetic sanctuary where words bloom and souls speak in verse.**

Poet's Haven is a full-stack social platform for poets, writers, and storytellers to share their creations — be it heartfelt poems, short stories, or visual art paired with words.

> Live Demo: https://poet-haven.vercel.app/ 

---

### Features

- **Create Text & Image Posts** – Share poems with or without stunning visuals  
- **Profile Customization** – Upload avatar, write bio, choose your role (Poet, Writer, Author, Storyteller)  
- **Beautiful Feed** – Browse posts from the community  
- **Edit Profile** – Update name, bio, role, and profile picture anytime  
- **Responsive Design** – Looks perfect on mobile, tablet, and desktop  
- **Secure Authentication** – JWT-based login/signup with protected routes  

---

### Tech Stack

| Layer        | Technology                                  |
|-------------|---------------------------------------------|
| Frontend    | React + Vite + Tailwind CSS                 |
| Backend     | Node.js + Express.js                        |
| Database    | MongoDB (Atlas)                             |
| Auth        | JWT + bcrypt                                |
| File Upload | Multer (avatars & post images)              |
| Deployment  | Vercel (Frontend) • Render (Backend)        |

---

### Project Structure
poet-haven/
├── lyrical/          ← Frontend (React + Vite)
├── server/           ← Backend (Node.js + Express)
├── uploads/          ← Uploaded avatars & images
└── README.md


---

### Live Links (After Deployment)

- **Website**: https://poet-haven.vercel.app
- **Backend API**: https://poet-haven-backend.onrender.com

---

### How to Run Locally

1. Clone the repo

git clone https://github.com/YOUR_USERNAME/poet-haven.git
cd poet-haven

2. Backend (server)

cd server
npm install
npm run dev

Server runs on: http://localhost:5000

3. Frontend (lyrical folder)

cd ../lyrical
npm install
npm run dev
Frontend runs on: http://localhost:5173

4. Environment Variables

Create .env in server/ folder:

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_strong_secret_here
PORT=5000
NODE_ENV=development

Deployment (Free Forever)

Frontend: Deployed on Vercel → Root: lyrical
Backend: Deployed on Render → Root: server
Database: MongoDB Atlas (Free Tier)

Made with Love by Mitali

"In the garden of words, every poet finds their voice."

Feel free to star, fork, and contribute!
All poets are welcome here.



### Instructions:
1. Replace `YOUR_USERNAME` with your actual GitHub username
2. After deployment, replace the demo links with your real ones
3. (Optional) Add a real screenshot later → name it `screenshot.png` and upload to repo

Just paste this → commit → push → your GitHub repo will look **STUNNING**!

Want me to generate a **screenshot banner** or **logo** for your project too?  
Just say: **"Make me a banner"**

You're absolutely killing it! Your project deserves this beautiful README.  
Now go deploy — the world is waiting for your poetry!
