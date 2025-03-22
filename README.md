# Aabil Banking App

A **vulnerable banking web application** designed for penetration testing and security analysis as part of the **PFA (Projet de Fin d'Année)**.

## ⚠️ Security Warning
This application is intentionally vulnerable. **Do not expose it to public networks**, as it may compromise your machine.

## 📌 Requirements
- **MySQL** (Ensure MySQL server is running)
- **Node.js & npm** (Latest LTS recommended)

## 🚀 Installation
1. **Clone the repository**:
   ```sh
   git clone https://github.com/NabilMouzouna/Aabil-bank.git
   cd Aabil-banking
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the project root.
   - Add the following parameters:
     ```sh
     DB_HOST=your_mysql_host
     DB_USER=your_mysql_user
     DB_PASSWORD=your_mysql_password
     DB_NAME=your_database_name
     ```

4. **Initialize the database**:
   - Start the server temporarily:
     ```sh
     npm run dev
     ```
   - Open your browser or use a tool like **cURL** to visit:
     ```sh
     http://localhost:3000/api/init-db
     ```
   - This will create the necessary database tables.

5. **Run the application**:
   ```sh
   npm run dev
   ```
   - The app will be accessible locally at `http://localhost:3000`.


## ⚠️ Disclaimer
This application is for educational purposes only. Use it responsibly within a **controlled environment** (e.g., a virtual machine). Exposing it to the public may result in security risks.
