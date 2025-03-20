import mysql from "mysql2/promise"

// Configuration de la connexion à la base de données MySQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "aabil_banking",
}

// Création du pool de connexions
const pool = mysql.createPool(dbConfig)

// Fonction pour exécuter des requêtes SQL
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Erreur de base de données:", error)
    throw error
  }
}

// Fonction pour initialiser la base de données (création des tables)
export async function initDatabase() {
  try {
    // Création de la table des utilisateurs
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Création de la table des transactions
    await query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id VARCHAR(36) PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        type ENUM('deposit', 'withdraw', 'transfer') NOT NULL,
        amount DECIMAL(15, 2) NOT NULL,
        recipient_id VARCHAR(36),
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)

    console.log("Base de données initialisée avec succès")
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error)
    throw error
  }
}

// Fonction pour vérifier la connexion à la base de données
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("Connexion à la base de données établie avec succès")
    connection.release()
    return true
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error)
    return false
  }
}

