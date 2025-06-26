import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [prenom, setPrenom]     = useState("");
  const [nom, setNom]           = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (prenom && nom && email && password) {
      localStorage.setItem(
        "taskflow_user",
        JSON.stringify({ prenom, nom, email })
      );
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="card">
        <div className="logo-container">
            <img src="/tasks.png" alt="TaskFlow Logo" className="logo" />
            <h1 className="app-title">TaskFlow</h1>
            <p className="welcome-text">Bienvenue sur TaskFlow 👋</p>
       </div>
        <h2 className="card-title">Créer un compte</h2>
        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-success">S’inscrire</button>
        </form>

        <p className="auth-link">
          Déjà inscrit ?{" "}
          <a href="/login">Se connecter</a>
        </p>
      </div>
    </div>
  );
}
