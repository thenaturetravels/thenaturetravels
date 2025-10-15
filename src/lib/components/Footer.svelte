<script>
  import siteData from '$lib/data/siteData.json';
</script>

<footer class="footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-section">
        <h3>{siteData.company.name}</h3>
        <p>Your trusted partner for unforgettable travel experiences in Southern India and beyond.</p>
        <div class="social-links">
          <a href="#" aria-label="Follow us on Facebook">
            <i class="fab fa-facebook" aria-hidden="true"></i>
          </a>
          <a href="#" aria-label="Follow us on Instagram">
            <i class="fab fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="#" aria-label="Follow us on Twitter">
            <i class="fab fa-twitter" aria-hidden="true"></i>
          </a>
        </div>
      </div>
      
      <div class="footer-section">
        <h4>Quick Links</h4>
        <ul role="list">
          {#each siteData.navigation as item}
            <li role="listitem">
              <a href={item.href} aria-label={item.name}>{item.name}</a>
            </li>
          {/each}
        </ul>
      </div>
      
      <div class="footer-section">
        <h4>Contact Info</h4>
        <ul role="list">
          <li role="listitem">
            <i class="fas fa-phone" aria-hidden="true"></i>
            {siteData.company.phone}
          </li>
          <li role="listitem">
            <i class="fas fa-envelope" aria-hidden="true"></i>
            {siteData.company.email}
          </li>
          <li role="listitem">
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            {siteData.company.address}
          </li>
          <li role="listitem">
            <i class="fas fa-clock" aria-hidden="true"></i>
            {siteData.company.hours}
          </li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 {siteData.company.name}. All rights reserved.</p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--dark);
    color: white;
    padding: 50px 0 20px;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 30px;
  }
  
  .footer-section h3,
  .footer-section h4 {
    margin-bottom: 20px;
    color: var(--secondary);
  }

    .footer-section p {
color:var(--light);
  }
  
  .footer-section ul {
    list-style: none;
    color:var(--light);
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
     /* color:var(--light); */
  }
  
  .footer-section ul li i {
    margin-right: 10px;
    width: 20px;
  }
  
  .footer-section a {
    color: var(--light);
    text-decoration: none;
    transition: var(--transition);
  }
  
  .footer-section a:hover,
  .footer-section a:focus {
    color: var(--secondary);
  }
  
  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 20px;
  }
  
  .social-links a {
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: var(--transition);
  }
  
  .social-links a:hover,
  .social-links a:focus {
    background-color: var(--primary);
    transform: translateY(-2px);
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    .footer-content {
      gap: 30px;
    }
  }
</style>