import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("taskflow_user", JSON.stringify({ email }));
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
        <h2 className="card-title">Se connecter</h2>
        <form onSubmit={handleSubmit} className="auth-form">
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
          <button type="submit" className="btn-primary">Connexion</button>
        </form>

        <p className="auth-link">
          Pas encore de compte ?{" "}
          <a href="/register">Créer un compte</a>
        </p>
      </div>
    </div>
  );
}
