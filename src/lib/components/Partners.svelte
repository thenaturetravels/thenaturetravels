<script>
  import { onMount, onDestroy } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let carouselRef;
  let autoScrollInterval;
  let isHovered = false;
  
  onMount(() => {
    startAutoScroll();
  });
  
  onDestroy(() => {
    stopAutoScroll();
  });
  
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!isHovered && carouselRef) {
        carouselRef.scrollBy({
          left: 1,
          behavior: 'auto'
        });
        
        // Reset to start when reaching the end
        if (carouselRef.scrollLeft >= carouselRef.scrollWidth - carouselRef.clientWidth - 1) {
          carouselRef.scrollLeft = 0;
        }
      }
    }, 30);
  }
  
  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  }
  
  function handleMouseEnter() {
    isHovered = true;
    stopAutoScroll();
  }
  
  function handleMouseLeave() {
    isHovered = false;
    startAutoScroll();
  }
</script>

<section id="partners" class="partners-section" aria-labelledby="partners-title">
  <div class="container">
    <div class="section-title">
      <h2 id="partners-title">{siteData.partners.title}</h2>
      <p>{siteData.partners.subtitle}</p>
    </div>
    
    <div class="partners-carousel-container">
      <div 
        class="partners-carousel"
        bind:this={carouselRef}
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
        aria-label="Our partners and clients"
      >
        {#each siteData.partners.companies as company}
          <div class="partner-logo" aria-label={company.name}>
            <img 
              src={company.logo} 
              alt={company.name}
              width="120"
              height="60"
              loading="lazy"
            />
          </div>
        {/each}
        
        <!-- Duplicate items for seamless loop -->
        {#each siteData.partners.companies as company}
          <div class="partner-logo" aria-label={company.name}>
            <img 
              src={company.logo} 
              alt={company.name}
              width="120"
              height="60"
              loading="lazy"
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .partners-section {
    padding: 60px 0;
    background-color: var(--light);
  }
  
  .partners-carousel-container {
    overflow: hidden;
    position: relative;
    margin: 0 -20px;
    max-width: 100%;
  }
  
  .partners-carousel {
    display: flex;
    align-items: center;
    gap: 40px;
    padding: 20px 0;
    animation: scroll 40s linear infinite;
    /* overflow-x: auto; */
  }
  
  .partners-carousel:hover {
    animation-play-state: paused;
  }
  
  .partner-logo {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 25px;
    background: white;
    border-radius: 8px;
    box-shadow: var(--shadow);
    transition: var(--transition);
  }
  
  .partner-logo:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  .partner-logo img {
    max-width: 120px;
    max-height: 60px;
    object-fit: contain;
    /* filter: grayscale(100%); */
    opacity: 0.7;
    transition: var(--transition);
  }
  
  .partner-logo:hover img {
    filter: grayscale(100%); 
    opacity: 1;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50% - 20px));
    }
  }
  
  @media (max-width: 768px) {
    .partners-carousel {
      gap: 30px;
      animation-duration: 30s;
    }
    
    .partner-logo {
      padding: 12px 20px;
    }
    
    .partner-logo img {
      max-width: 100px;
      max-height: 50px;
    }
  }
</style>