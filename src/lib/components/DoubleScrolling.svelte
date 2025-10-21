<script>
  const categories = [
    
    {
      title: "Adult",
      subtitle: "Adventure & Relaxation",
      image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg"
    },
    {
      title: "Honeymoon",
      subtitle: "Romantic Getaways",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg"
    },
   
    {
      title: "Events",
      subtitle: "Cultural & Music Tours",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
    },
    {
      title: "Gallery",
      subtitle: "Explore & Capture",
      image: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg"
    }
  ];
</script>

<section class="categories">
  <h2>Browse by Travel Category</h2>
  <p class="subtext">Find your perfect experience</p>

  <div class="scroll-container">
    {#each categories as c}
      <div class="card" style="background-image: url('{c.image}')">
        <div class="overlay">
          <h3>{c.title}</h3>
          <p>{c.subtitle}</p>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  section.categories {
    padding: 20px 10px;
    color: #fff;
    text-align: center;
    overflow: hidden;
    background-color: var(--light);
  }

  h2 {
    color: var(--primary);
    font-size: 1.8rem;
    margin-bottom: 0.25rem;
  }

  .subtext {
    color: var(--primary);
    margin-bottom: 1.5rem;
  }

  .scroll-container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 1rem;
    padding-bottom: 1rem;
    cursor: grab;
  }

  .scroll-container::-webkit-scrollbar {
    height: 8px;
  }

  .scroll-container::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FF6B00, #FFD700, #00BFFF, #0074D9);
    border-radius: 4px;
  }

  .card {
    position: relative;
    flex: 0 0 auto;
    width: 220px;
    height: 160px;
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }

  .overlay h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #fff;
  }

  .overlay p {
    margin-top: 4px;
    color: #f5f5f5;
    font-size: 0.9rem;
  }

  /* Double-scroll illusion for large screens */
  @media (min-width: 900px) {
    .scroll-container {
      overflow-x: hidden;
    }
    .scroll-container:hover {
      animation: scrollX 14s linear infinite alternate;
    }

    @keyframes scrollX {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  }
</style>
