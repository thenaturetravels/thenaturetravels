<script>
  import siteData from '$lib/data/siteData.json';
  
  let email = '';
  
  function handleSubscribe(e) {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
    email = '';
    // Show success message
  }
</script>

<section class="newsletter-section" aria-labelledby="newsletter-title">
  <div class="container">
    <div class="section-title">
      <h2 id="newsletter-title">{siteData.newsletter.title}</h2>
      <p>{siteData.newsletter.subtitle}</p>
    </div>
    
    <form class="newsletter-form" on:submit={handleSubscribe} aria-label="Newsletter subscription">
      <label for="newsletter-email" class="sr-only">
        Email address for newsletter
      </label>
      <input
        id="newsletter-email"
        type="email"
        bind:value={email}
        class="newsletter-input"
        placeholder={siteData.newsletter.placeholder}
        required
        aria-required="true"
      />
      <button type="submit" class="newsletter-btn" aria-label="Subscribe to newsletter">
        Subscribe
      </button>
    </form>
  </div>
</section>

<style>
  .newsletter-section {
    background: var(--primary);
    padding: 60px 0;
    text-align: center;
  }
  
  .newsletter-section .section-title h2,
  .newsletter-section .section-title p {
    color: white;
  }
  
  .newsletter-form {
    max-width: 500px;
    margin: 0 auto;
    display: flex;
  }
  
  .newsletter-input {
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
    min-width: 0;
  }
  
  .newsletter-btn {
    padding: 15px 25px;
    background-color: var(--accent);
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .newsletter-btn:hover,
  .newsletter-btn:focus {
    background-color: var(--secondary);
    color: var(--dark);
  }
  
  @media (max-width: 768px) {
    .newsletter-form {
      flex-direction: column;
    }
    
    .newsletter-input {
      border-radius: 4px;
      margin-bottom: 10px;
    }
    
    .newsletter-btn {
      border-radius: 4px;
    }
  }
</style>