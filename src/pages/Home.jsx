import { Link } from 'react-router-dom';
import '../styles/Home.css'; // à créer dans styles/

export default function Home() {
  return (
    <div className="home-container">
      <img src="/tasks.png" alt="TaskFlow logo" className="home-logo" />
      <h1 className="home-title">Bienvenue sur <span className="highlight">TaskFlow</span></h1>
      <p className="home-subtitle">Votre outil simple et rapide pour organiser vos tâches.</p>

      <div className="home-actions">
        <Link to="/login" className="btn blue">Se connecter</Link>
        <Link to="/register" className="btn green">S’inscrire</Link>
      </div>

      <div className="features">
        <h2>Pourquoi utiliser TaskFlow ?</h2>
        <ul>
          <li>✅ Organisation intuitive des tâches par statut</li>
          <li>✅ Glisser-déposer pour changer de colonne</li>
          <li>✅ Interface simple et responsive</li>
          <li>✅ Mode sombre/claire</li>
        </ul>
      </div>
    </div>
  );
}
