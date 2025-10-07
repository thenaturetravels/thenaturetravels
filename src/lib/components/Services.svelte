<script>
  import siteData from '$lib/data/siteData.json';
</script>

<section id="services" class="services-section" aria-labelledby="services-title">
  <div class="container">
    <div class="section-title">
      <h2 id="services-title">{siteData.services.title}</h2>
      <p>{siteData.services.subtitle}</p>
    </div>
    
    <div class="services-grid">
      {#each siteData.services.items as service}
        <article class="service-card animate" aria-label={service.name}>
          <div class="service-image">
            <img 
              src={service.image} 
              alt={service.alt}
              width="350"
              height="200"
              loading="lazy"
            />
          </div>
          <div class="service-content">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <a href={service.link} class="service-link" aria-label={`Learn more about ${service.name}`}>
              Learn More
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .services-section {
    padding: 80px 0;
  }
  
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .service-card {
    background-color: var(--light);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .service-card:hover {
    transform: translateY(-5px);
  }
  
  .service-image {
    height: 200px;
    overflow: hidden;
  }
  
  .service-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
  }
  
  .service-card:hover .service-image img {
    transform: scale(1.05);
  }
  
  .service-content {
    padding: 20px;
  }
  
  .service-content h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--primary);
  }
  
  .service-content p {
    color: var(--text);
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .service-link {
    display: inline-block;
    color: var(--primary);
    font-weight: 500;
    text-decoration: none;
    transition: var(--transition);
    border-bottom: 2px solid transparent;
  }
  
  .service-link:hover,
  .service-link:focus {
    color: var(--accent);
    border-bottom-color: var(--accent);
  }
  
  @media (max-width: 768px) {
    .services-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>