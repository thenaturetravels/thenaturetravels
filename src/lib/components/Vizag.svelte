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

<section id="vizag" class="vizag-section" aria-labelledby="vizag-title">
  <div class="container">
    <div class="section-title">
      <h2 id="vizag-title">{siteData.vizag.title}</h2>
      <p>{siteData.vizag.subtitle}</p>
    </div>
    
    <div class="carousel-container">
      <div class="carousel" bind:this={carouselRef} aria-label="Vizag destinations carousel">
        {#each siteData.vizag.destinations as destination}
          <article class="carousel-item animate" aria-label={destination.name}>
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
  .vizag-section {
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
  
  .carousel-item:hover .vizag-image img {
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
    color: var(--primary);
    padding: 5px;
    border-radius: 4px;
    text-decoration: none;
    transition: var(--transition);
    font-weight: 500;
    border: 2px solid var(--primary);
  }
  
  .vizag-btn:hover,
  .vizag-btn:focus {
    background: var(--primary);
    color: #fff;
    border-color: #fff;
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

  @media (max-width: 480px) {
    .carousel-item {
        width: 200px;
    }
    .vizag-content h3{
      font-size:1rem;
    }

    .vizag-image{
      height: 150px;
    }
}
</style>