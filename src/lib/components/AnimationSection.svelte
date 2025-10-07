<script>
  import siteData from '$lib/data/siteData.json';
  
  const { animationSection } = siteData;
</script>

<section class="animation-section" aria-labelledby="animation-title">
  <div class="container">
    <div class="animation-container animate">
      <div class="animation-content">
        <h2 id="animation-title">{animationSection.title}</h2>
        <p>{animationSection.content}</p>
        <a href="#contact" class="cta-button" aria-label="Start your travel adventure">
          {animationSection.ctaText}
        </a>
      </div>
      <div class="animation-graphics">
        <img 
          src={animationSection.image} 
          alt={animationSection.alt}
          width="600"
          height="400"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

<style>
  .animation-section {
    background-color: var(--dark);
    color: white;
    padding: 80px 0;
    text-align: center;
  }
  
  .animation-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    align-items: center;
  }
  
  .animation-content {
    
    flex: 1;
    min-width: 300px;
    text-align: left;
  }
  
  .animation-content h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--secondary);
  }
  
  .animation-content p {
    margin-bottom: 30px;
    font-size: 1.1rem;
    line-height: 1.7;
    color:var(--light);
  }
  
  .animation-graphics {
    flex: 1;
    min-width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .animation-graphics img {
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  .cta-button {
    display: inline-block;
    background-color: var(--accent);
    color: white;
    padding: 12px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: var(--transition);
    border: 2px solid var(--accent);
  }
  
  .cta-button:hover,
  .cta-button:focus {
    background-color: var(--secondary);
    color: var(--dark);
    transform: translateY(-3px);
    border-color: var(--secondary);
  }
  
  @media (max-width: 768px) {
    .animation-container {
      flex-direction: column;
    }
    
    .animation-content {
      text-align: center;
    }
    
    .animation-content h2 {
      font-size: 2rem;
    }
  }
</style>