<script>
  import { onMount } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let carouselRef;
  
  onMount(() => {
    // Initialize carousel functionality
  });
  
  function scrollCarousel(direction) {
    if (carouselRef) {
      const scrollAmount = 300;
      carouselRef.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
</script>

<section id="services" class="services-section" aria-labelledby="services-title">
  <div class="container">
    <div class="section-title">
      <h2 id="services-title">{siteData.services.title}</h2>
      <p>{siteData.services.subtitle}</p>
    </div>
    
    <div class="carousel-container">
      <div class="carousel" bind:this={carouselRef} aria-label="Services carousel">
        {#each siteData.services.items as service}
          <article class="carousel-item animate" aria-label={service.name}>
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
      
      <div class="carousel-nav" aria-label="Carousel navigation">
        <button 
          class="carousel-btn prev" 
          on:click={() => scrollCarousel(-1)}
          aria-label="Previous services"
        >
          <i class="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button 
          class="carousel-btn next" 
          on:click={() => scrollCarousel(1)}
          aria-label="Next services"
        >
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .services-section {
    padding: 80px 0;
  }
  
  .carousel-container {
    position: relative;
    overflow: hidden;
    margin: 0 -15px;
  }
  
  .carousel {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 20px 0;
    gap: 15px;
  }
  
  .carousel::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 300px;
    background-color: var(--light);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .carousel-item:hover {
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
  
  .carousel-item:hover .service-image img {
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
  
  .carousel-nav {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  .carousel-btn {
    background: var(--primary);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: var(--transition);
    opacity: 0.8;
  }
  
  .carousel-btn:hover,
  .carousel-btn:focus {
    opacity: 1;
    background-color: var(--accent);
  }
  
  @media (max-width: 768px) {
    .carousel-btn {
      display: none;
    }
    
    .carousel {
      padding: 10px;
    }
    
    .carousel-item {
      width: 280px;
    }
  }
</style>