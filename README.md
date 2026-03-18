# 🩸 BloodLink - Smart Donor Finder Network

> Connecting lives, one drop at a time.

BloodLink is a full-stack web application that helps users find blood donors quickly during emergencies. It provides real-time donor availability, location-based search, and an interactive dashboard to connect donors and recipients efficiently.

---

## 🚀 Features

- 🔍 Search donors by blood group (A+, B-, O+, etc.)
- 📍 Filter donors by city/location
- ⚡ Real-time availability tracking
- 🚨 Urgent donor highlighting
- 📊 Live dashboard (total donors, active donors, cities covered)
- 📞 One-click contact with donors
- 🏥 Nearby blood bank suggestions (map integration)

---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, JavaScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT (JSON Web Token)

---

## 📁 Project Structure
blood-donation/
│
├── node_modules/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── assets/
│ └── main.js
│
├── server/
│ ├── routes/
│ ├── models/
│ ├── controllers/
│ └── server.js
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .gitignore
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
git clone https://github.com/govindchauhan45/blood-link.git

cd blood-link


---

### 2. Install Dependencies

#### Frontend

npm install


#### Backend

cd server
npm install
cd ..


---

### 3. Environment Variables

Create a `.env` file inside the `server` folder:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


---

### 4. Run the Application

#### Start Backend

cd server
npm start


#### Start Frontend

npm run dev


---

## 🌐 How It Works

1. User registers or logs in  
2. Searches donors using blood group or city  
3. System filters and shows available donors  
4. User contacts donor directly  
5. Dashboard updates in real-time  

---

## 📸 Screenshots

(Add your images inside `public/screenshots/`)


public/screenshots/dashboard.png
public/screenshots/search.png
public/screenshots/map.png


---

## 🎯 Use Case

- Emergency blood requirement  
- Quick donor discovery  
- Real-time availability tracking  
- Centralized donor network  

---

## 🔮 Future Improvements

- 📱 Mobile app (Android/iOS)  
- 🔔 SMS & Email notifications  
- 🤖 AI-based donor recommendations  
- 🗺️ Live donor tracking  
- 🏥 Hospital integration  

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/new-feature`)  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---

## 🛡️ License

This project is licensed under the MIT License.

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

Shailendra Sahu  
GitHub: https://github.com/govindchauhan45  

---

## 🚀 Project Status

🟢 Active & Under Development  

---

## 💡 Tagline

Saving lives through technology.