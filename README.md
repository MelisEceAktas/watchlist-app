A full-stack movie watchlist application where users can search for movies, save them to their personal watchlist, and manage their account. Built with **React**, **Node.js**, **MongoDB**, and **TMDb API**.

***Made by [@MelisEceAktas](https://github.com/MelisEceAktas) and [@joonullus](https://github.com/joonullus)***

## 🚀 Features   
✅ **Movie Search** - Fetch movies from **TMDb API** based on user queries.  
✅ **Personal Watchlist** - Users can add and remove movies from their private list.  
✅ **Account Management** - Change username or delete account.  
✅ **User Authentication** - Sign up, log in, log out.  
✅ **Responsive Design** - Styled with **Bootstrap** and **CSS**.  


## 🛠️ Tech Stack  

### Frontend (React)  
- **React.js** - UI library  
- **Bootstrap & CSS** - Styling  
- **Axios** - API requests  

### Backend (Node.js)  
- **Express.js** - Server framework  
- **MongoDB (Mongoose)** - Database  
- **TMDb API** - Movie data source  
- **Axios** - API requests  
- **CORS** - Cross-origin handling  
- **Morgan** - Logging  


## 🔧 Installation  

### Prerequisites  
Ensure you have **Node.js** and **MongoDB** installed.  

### Clone the Repository  
```sh
git clone https://github.com/MelisEceAktas/watchlist-app.git
cd watchlist-app
```

### Backend Setup
```sh
cd backend
npm install
```
Create a new .env file and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=your_port (probably 3000)
TMDB_API_KEY=your_tmdb_api_key
```
Run the backend
```sh
npm run dev
```

### Frontend Setup
```sh
cd frontend-react
npm install
```
Run the frontend
```sh
npm run dev
```
Go to the link given by the terminal.


## 📌 API Routes
All API routes are defined in the **routes** folder of the backend.

