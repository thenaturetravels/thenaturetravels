<script>
  import { onMount, onDestroy } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let searchQuery = '';
  let currentImageIndex = 0;
  let carouselInterval;
  
  // Function to handle next image
  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % siteData.hero.backgroundImages.length;
  }
  
  // Function to handle previous image
  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + siteData.hero.backgroundImages.length) % siteData.hero.backgroundImages.length;
  }
  
  // Function to go to specific image
  function goToImage(index) {
    currentImageIndex = index;
  }
  
  function handleSearch(e) {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  }
  
  // Start auto-scroll carousel
  onMount(() => {
    carouselInterval = setInterval(() => {
      nextImage();
    }, siteData.hero.carouselInterval || 5000);
    
    return () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    };
  });
  
  onDestroy(() => {
    if (carouselInterval) {
      clearInterval(carouselInterval);
    }
  });
</script>

<section id="home" class="hero" aria-labelledby="hero-title">
  <!-- Background Carousel -->
  <div class="carousel-container">
    {#each siteData.hero.backgroundImages as image, index}
      <div 
        class="carousel-slide {index === currentImageIndex ? 'active' : ''}"
        style="background-image: url('{image}')"
        aria-hidden="{index !== currentImageIndex}"
      >
        <div class="image-overlay"></div>
      </div>
    {/each}
  </div>
  
  <!-- Carousel Controls -->
  <div class="carousel-controls">
    <button class="carousel-btn prev" on:click={prevImage} aria-label="Previous image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    
    <button class="carousel-btn next" on:click={nextImage} aria-label="Next image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  </div>
  
  <!-- Carousel Indicators -->
  <div class="carousel-indicators">
    {#each siteData.hero.backgroundImages as _, index}
      <button
        class="indicator {index === currentImageIndex ? 'active' : ''}"
        on:click={() => goToImage(index)}
        aria-label="Go to image {index + 1}"
      ></button>
    {/each}
  </div>

  <!-- Hero Content -->
  <div class="container">
    <div class="hero-content">
      <h1 id="hero-title" class="hero-title">
        {siteData.hero.title}
      </h1>
      <p class="hero-subtitle">
        {siteData.hero.subtitle}
      </p>
      
      <form class="search-bar" on:submit={handleSearch} role="search">
        <label for="search-input" class="sr-only">
          Search for destinations and activities
        </label>
        <input
          id="search-input"
          type="text"
          bind:value={searchQuery}
          placeholder={siteData.hero.searchPlaceholder}
          aria-label="Search for travel destinations and activities"
        />
        <button type="submit" aria-label="Perform search">
          Search
        </button>
      </form>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 80vh;
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
    overflow: hidden;
  }
  
  /* Carousel Styles */
  .carousel-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    transform: scale(1.1);
    animation: zoomOut 8s ease-in-out infinite;
  }
  
  .carousel-slide.active {
    opacity: 1;
    z-index: 1;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.3)
    );
  }
  
  /* Carousel Controls */
  .carousel-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 3;
  }
  
  .carousel-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .carousel-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  /* Carousel Indicators */
  .carousel-indicators {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    z-index: 3;
  }
  
  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .indicator.active {
    background: white;
    transform: scale(1.2);
  }
  
  .indicator:hover {
    background: rgba(255, 255, 255, 0.5);
  }
  
  /* Hero Content */
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 2;
  }
  
  .hero-title {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: fadeInUp 1s ease;
    line-height: 1.2;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
    animation: fadeInUp 1.2s ease;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
  }
  
  .search-bar {
    display: flex;
    max-width: 600px;
    margin: 0 auto;
    animation: fadeInUp 1.4s ease;
  }
  
  .search-bar input {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
    min-width: 0;
    background: rgba(255, 255, 255, 0.95);
  }
  
  .search-bar button {
    padding: 15px 25px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .search-bar button:hover,
  .search-bar button:focus {
    background-color: var(--secondary);
    color: var(--dark);
  }
  
  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes zoomOut {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero {
      height: 70vh;
    }
    
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
    }
    
    .carousel-btn {
      width: 40px;
      height: 40px;
    }
    
    .carousel-controls {
      padding: 0 10px;
    }
  }
  
  @media (max-width: 576px) {
    .hero {
      height: 60vh;
    }
    
    .hero-title {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 1rem;
    }
    
    .search-bar {
      flex-direction: column;
    }
    
    .search-bar input {
      border-radius: 4px;
      margin-bottom: 10px;
    }
    
    .search-bar button {
      border-radius: 4px;
    }
    
    .carousel-controls {
      display: none; /* Hide controls on very small screens */
    }
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .carousel-slide {
      animation: none;
      transition: none;
    }
    
    .carousel-btn,
    .indicator {
      transition: none;
    }
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>