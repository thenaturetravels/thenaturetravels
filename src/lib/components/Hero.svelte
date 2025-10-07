<script>
  import { onMount } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let searchQuery = '';
  
  function handleSearch(e) {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  }
</script>

<section id="home" class="hero" aria-labelledby="hero-title">
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
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    background-size: cover;
    background-position: center;
    height: 80vh;
    display: flex;
    align-items: center;
    color: white;
    text-align: center;
  }
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .hero-title {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: fadeInUp 1s ease;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
    animation: fadeInUp 1.2s ease;
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
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 576px) {
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
  }
</style>