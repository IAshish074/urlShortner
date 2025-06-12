# 🔗 URL Shortener

A simple and minimal Node.js URL shortener that allows you to shorten long URLs with optional custom short codes. Data is stored in a local JSON file (`links.json`). Ideal for learning backend concepts and building lightweight utilities.

---

## 🚀 Features

- Generate short URLs from long ones
- Custom short codes (optional)
- JSON-based storage (no database required)
- Redirects using HTTP GET
- Frontend form with automatic list rendering
- Simple, clean UI using plain HTML/CSS/JS

---

## 📂 Project Structure

project/
│
├── data/
│ └── links.json # Stores shortCode → original URL mappings
│
├── public/
│ ├── index.html # Frontend page
│ ├── style.css # Basic styles
│ └── script.js # Frontend logic
│
├── server.js / app.js # Main Node.js backend server



---

## ⚙️ How to Run

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
Install dependencies (optional, none required for this basic version)

Run the server

bash
Copy
Edit
node app.js
Open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
🔧 Usage
Enter a long URL in the form.

Optionally enter a custom short code (e.g., my-link).

Click Shorten.

You'll get a link like:

perl
Copy
Edit
http://localhost:3000/my-link
Visiting that link will redirect to the original long URL.

All shortened links are listed below the form.

📥 Example links.json
json
Copy
Edit
{
  "youtube": {
    "original": "https://www.youtube.com/",
    "short": "http://localhost:3000/youtube"
  },
  "abc123": {
    "original": "https://openai.com/",
    "short": "http://localhost:3000/abc123"
  }
}
🛠 Technologies Used
Node.js (HTTP module)

JavaScript

HTML & CSS (No frameworks)

✨ Future Improvements
Host on the cloud (Render/Vercel/Heroku)

Add analytics (click count)

Expiration for short links

REST API endpoint for programmatic usage

📄 License
This project is open-source and available under the MIT License.

🙌 Acknowledgements
Inspired by Bitly and other link shorteners. Great for learning the basics of servers and data handling with Node.js.

yaml
Copy
Edit











