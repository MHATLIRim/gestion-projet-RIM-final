require('dotenv').config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Récupération du token depuis l'en-tête Authorization
  const token = req.header("Authorization")?.split(" ")[1];

  // Vérifier si le token est fourni
  if (!token) {
    return res.status(401).json({ message: "Accès refusé, aucun token fourni" });
  }

  try {
    // Vérifie le token avec la clé secrète provenant du .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Ajoute les infos utilisateur dans la requête
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expiré. Veuillez vous reconnecter." });
    } else {
      return res.status(400).json({ message: "Token invalide." });
    }
  }
};

module.exports = authMiddleware;
