// HomePage.jsx

import { Link } from "react-router-dom";
import "./tailwind-local.css"; // Імпорт локального Tailwind стилю
import styles from "./HomePage.module.css";
import bgImage from "../../assets/bgphone.jpg"; // Імпорт зображення

const HomePage = () => (
  <div
    className={`${styles.hero} hero min-h-screen`} // Додаємо клас з CSS модуля
    style={{
      backgroundImage: `url(${bgImage})`, // Використання локального зображення
    }}
  >
    <div className="hero-overlay bg-opacity-60"></div>
    <div className="hero-content text-neutral-content text-center">
      <div className="max-w-md mt-15">
        {" "}
        {/* Додаємо клас mt-15 для відступу зверху */}
        <h1 className="mb-5 text-5xl font-bold text-white">
          <br></br>
          Welcome to the Phonebook!
        </h1>
        <p className="mb-5 text-white text-lg">
          The best app, where you can manage <br></br> your contacts!
        </p>
        <Link to="/register">
          <button className={styles.getStartedButton}>
            {" "}
            {/* кнопка Get started */}
            Get started
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
