<script>
  import siteData from '$lib/data/siteData.json';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    formData = { name: '', email: '', subject: '', message: '' };
    // Show success message
  }
</script>

<section id="contact" class="contact-section" aria-labelledby="contact-title">
  <div class="container">
    <div class="section-title">
      <h2 id="contact-title">{siteData.contact.title}</h2>
      <p>{siteData.contact.subtitle}</p>
    </div>
    
    <div class="contact-container">
      <div class="contact-info">
        <h3>Get In Touch</h3>
        <div class="contact-details">
          <p>
            <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
            {siteData.company.address}
          </p>
          <p>
            <i class="fas fa-phone" aria-hidden="true"></i>
            {siteData.company.phone}
          </p>
          <p>
            <i class="fas fa-envelope" aria-hidden="true"></i>
            {siteData.company.email}
          </p>
          <p>
            <i class="fas fa-clock" aria-hidden="true"></i>
            {siteData.company.hours}
          </p>
        </div>
        <div class="social-links">
          {#each siteData.footer.socialLinks as social}
            <a 
              href={social.link} 
              aria-label={`Follow us on ${social.label}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class={`fab fa-${social.icon}`} aria-hidden="true"></i>
            </a>
          {/each}
        </div>
      </div>
      
      <div class="contact-form">
        <form on:submit={handleSubmit} aria-label="Contact form">
          <div class="form-group">
            <label for="name">Your Name *</label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              required
              aria-required="true"
            />
          </div>
          <div class="form-group">
            <label for="email">Your Email *</label>
            <input
              id="email"
              type="email"
              bind:value={formData.email}
              required
              aria-required="true"
            />
          </div>
          <div class="form-group">
            <label for="subject">Subject *</label>
            <input
              id="subject"
              type="text"
              bind:value={formData.subject}
              required
              aria-required="true"
            />
          </div>
          <div class="form-group">
            <label for="message">Your Message *</label>
            <textarea
              id="message"
              bind:value={formData.message}
              required
              aria-required="true"
            ></textarea>
          </div>
          <button type="submit" class="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
    
    <div class="map-container">
      <iframe
        src={siteData.contact.mapEmbed}
        width="100%"
        height="400"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Nature Travels Office Location"
        aria-label="Map showing Nature Travels office location"
      ></iframe>
    </div>
  </div>
</section>

<style>
  .contact-section {
    padding: 80px 0;
  }
  
  .contact-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .contact-info {
    flex: 1;
    min-width: 300px;
  }
  
  .contact-info h3 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--primary);
  }
  
  .contact-details {
    margin-bottom: 30px;
  }
  
  .contact-details p {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .contact-details i {
    margin-right: 10px;
    color: var(--primary);
    width: 20px;
  }
  
  .contact-form {
    flex: 1;
    min-width: 300px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--text);
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: var(--transition);
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(42, 157, 143, 0.2);
  }
  
  .form-group textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .submit-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 4px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
    font-size: 1rem;
  }
  
  .submit-btn:hover,
  .submit-btn:focus {
    background-color: var(--accent);
  }
  
  .map-container {
    margin-top: 40px;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-links a {
    color: var(--primary);
    font-size: 1.5rem;
    transition: var(--transition);
    padding: 10px;
    border-radius: 50%;
    background-color: var(--light);
  }
  
  .social-links a:hover,
  .social-links a:focus {
    color: var(--accent);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    .contact-container {
      gap: 30px;
    }
  }
</style>