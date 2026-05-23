export default function Hero() {
  return (
    <section className="hero">
      <img src="/profile.jpg" alt="Enya Moncayo" className="profile-img" />

      <h1>Enya Moncayo</h1>
      <p>BS Computer Science Student | Web & Software Development</p>

      <div className="hero-buttons">
        <a href="#projects" className="btn">
          View Projects
        </a>
        <a href="#contact" className="btn outline">
          Contact Me
        </a>
      </div>
    </section>
  );
}
