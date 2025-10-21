<script>
  import { onMount } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let activeSeason = siteData.seasonal.seasons.find(season => season.active)?.name || 'summer';
  let carouselRefs = {};
  
  function setActiveSeason(seasonName) {
    activeSeason = seasonName;
  }
  
  function scrollCarousel(seasonName, direction) {
    const carousel = carouselRefs[seasonName];
    if (carousel) {
      const scrollAmount = 300;
      carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
</script>

<section id="seasonal" class="seasonal-section" aria-labelledby="seasonal-title">
  <div class="container">
    <div class="section-title">
      <h2 id="seasonal-title">{siteData.seasonal.title}</h2>
      <p>{siteData.seasonal.subtitle}</p>
    </div>
    
    <div class="seasonal-controls" role="tablist" aria-label="Select season">
      {#each siteData.seasonal.seasons as season}
        <button
          class="season-btn {activeSeason === season.name ? 'active' : ''}"
          on:click={() => setActiveSeason(season.name)}
          role="tab"
          aria-selected={activeSeason === season.name}
          aria-controls={`${season.name}-carousel`}
        >
          {season.label}
        </button>
      {/each}
    </div>
    
    {#each siteData.seasonal.seasons as season}
      <div
        id={`${season.name}-carousel`}
        class="seasonal-carousel {activeSeason === season.name ? 'active' : ''}"
        role="tabpanel"
        aria-labelledby={`${season.name}-tab`}
        hidden={activeSeason !== season.name}
      >
        <div class="carousel-container">
          <div 
            class="carousel" 
            bind:this={carouselRefs[season.name]}
            aria-label={`${season.label} destinations`}
          >
            {#each season.destinations as destination}
              <article class="carousel-item animate" aria-label={destination.name}>
                <img 
                  src={destination.image} 
                  alt={destination.alt}
                  width="300"
                  height="200"
                  loading="lazy"
                />
                <div class="carousel-content">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                </div>
              </article>
            {/each}
          </div>
          
          <div class="carousel-nav" aria-label="Carousel navigation for {season.label}">
            <button 
              class="carousel-btn prev" 
              on:click={() => scrollCarousel(season.name, -1)}
              aria-label="Previous destinations"
            >
              <i class="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button 
              class="carousel-btn next" 
              on:click={() => scrollCarousel(season.name, 1)}
              aria-label="Next destinations"
            >
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .seasonal-section {
    padding: 80px 0;
  }
  
  .seasonal-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }
  
  .season-btn {
    padding: 10px 20px;
    background-color: var(--light);
    color: var(--text);
    border: 2px solid var(--primary);
    border-radius: 30px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .season-btn.active {
    background: var(--primary);
    color: white;
  }
  
  .season-btn:hover:not(.active) {
    background-color: var(--secondary);
    color: var(--dark);
  }
  
  .seasonal-carousel {
    display: none;
  }
  
  .seasonal-carousel.active {
    display: block;
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
    padding: 20px 10px;
    gap: 15px;
  }
  
  .carousel::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-item {
    flex: 0 0 auto;
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .carousel-item:hover {
    transform: translateY(-5px);
  }
  
  .carousel-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .carousel-content {
    padding: 15px;
    background-color: var(--light);
  }
  
  .carousel-content h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: var(--primary);
  }
  
  .carousel-content p {
    color: var(--text);
    font-size: 0.9rem;
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
  }
</style>