<script>
  import siteData from '$lib/data/siteData.json';
</script>

<section class="highlights-section" aria-labelledby="highlights-title">
  <div class="container">
    <div class="section-title">
      <h2 id="highlights-title">{siteData.highlights.title}</h2>
    </div>
    
    <div class="highlights-container">
      {#each siteData.highlights.items as highlight}
        <div class="highlight-item animate" aria-label={highlight.title}>
          <div class="highlight-icon">
            <i class="fas fa-{highlight.icon}" aria-hidden="true"></i>
          </div>
          <div class="highlight-content">
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .highlights-section {
    background-color: var(--secondary);
    padding: 80px 0;
  }
  
  .highlights-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }
  
  .highlight-item {
    flex: 1;
    min-width: 300px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  
  .highlight-icon {
    font-size: 2.5rem;
    color: var(--primary);
    flex-shrink: 0;
  }
  
  .highlight-content h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--primary);
  }
  
  .highlight-content p {
    color: var(--text);
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .highlights-container {
      gap: 30px;
    }
    
    .highlight-item {
      min-width: 100%;
      text-align: center;
      flex-direction: column;
    }
  }
</style>