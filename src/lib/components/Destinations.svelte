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

<section id="destinations" class="destinations-section" aria-labelledby="destinations-title">
  <div class="container">
    <div class="section-title">
      <h2 id="destinations-title">{siteData.destinationss.title}</h2>
      <p>{siteData.destinationss.subtitle}</p>
    </div>
    
    <div class="carousel-container">
      <div class="carousel" bind:this={carouselRef} aria-label="Travel destinations carousel">
        {#each siteData.destinationss.items as destination}
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
              <p>{destination.properties}</p>
            </div>
          </article>
        {/each}
      </div>
      
      <div class="carousel-nav" aria-label="Carousel navigation">
        <button 
          class="carousel-btn prev" 
          on:click={() => scrollCarousel(-1)}
          aria-label="Previous destinations"
        >
          <i class="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button 
          class="carousel-btn next" 
          on:click={() => scrollCarousel(1)}
          aria-label="Next destinations"
        >
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
</section>

<style>
  .destinations-section {
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
  
  /* .animate {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .animate.animated {
    opacity: 1;
    transform: translateY(0);
  } */
  
  @media (max-width: 768px) {
    .carousel-btn {
      display: none;
    }
    
    .carousel {
      padding: 10px;
    }
  }
</style>