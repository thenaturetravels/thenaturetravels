<script>
  import siteData from '$lib/data/siteData.json';
</script>

<section id="vizag" class="vizag-section" aria-labelledby="vizag-title">
  <div class="container">
    <div class="section-title">
      <h2 id="vizag-title">{siteData.vizag.title}</h2>
      <p>{siteData.vizag.subtitle}</p>
    </div>
    
    <div class="vizag-grid">
      {#each siteData.vizag.destinations as destination}
        <article class="vizag-card animate" aria-label={destination.name}>
          <div class="vizag-image">
            <img 
              src={destination.image} 
              alt={destination.alt}
              width="300"
              height="200"
              loading="lazy"
            />
          </div>
          <div class="vizag-content">
            <h3>{destination.name}</h3>
            <a href={destination.link} class="vizag-btn" aria-label={`Explore ${destination.name}`}>
              Explore
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .vizag-section {
    padding: 80px 0;
  }
  
  .vizag-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .vizag-card {
    background-color: var(--light);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .vizag-card:hover {
    transform: translateY(-5px);
  }
  
  .vizag-image {
    height: 200px;
    overflow: hidden;
  }
  
  .vizag-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .vizag-card:hover .vizag-image img {
    transform: scale(1.05);
  }
  
  .vizag-content {
    padding: 20px;
    text-align: center;
  }
  
  .vizag-content h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: var(--primary);
  }
  
  .vizag-btn {
    display: inline-block;
    background-color: var(--primary);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: var(--transition);
    font-weight: 500;
    border: 2px solid var(--primary);
  }
  
  .vizag-btn:hover,
  .vizag-btn:focus {
    background-color: var(--accent);
    border-color: var(--accent);
  }
  
  @media (max-width: 768px) {
    .vizag-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>