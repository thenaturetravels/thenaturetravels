<script>
  import { onMount } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let activeFaq = null;
  
  function toggleFaq(index) {
    activeFaq = activeFaq === index ? null : index;
  }
</script>

<section class="faq-section" aria-labelledby="faq-title">
  <div class="container">
    <div class="section-title">
      <h2 id="faq-title">{siteData.faq.title}</h2>
      <p>{siteData.faq.subtitle}</p>
    </div>
    
    <div class="faq-container">
      {#each siteData.faq.items as item, index}
        <div class="faq-item {activeFaq === index ? 'active' : ''}">
          <button 
            class="faq-question"
            on:click={() => toggleFaq(index)}
            aria-expanded={activeFaq === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span>{item.question}</span>
            <i class="fas fa-chevron-down" aria-hidden="true"></i>
          </button>
          <div 
            id={`faq-answer-${index}`}
            class="faq-answer"
            role="region"
            aria-labelledby={`faq-question-${index}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    padding: 80px 0;
  }
  
  .faq-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .faq-item {
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  
  .faq-question {
    background-color: var(--primary);
    color: white;
    padding: 15px 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
    width: 100%;
    border: none;
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
  }
  
  .faq-question:hover {
    background-color: var(--secondary);
    color: var(--dark);
  }
  
  .faq-answer {
    background-color: var(--light);
    padding: 0 20px;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  
  .faq-item.active .faq-answer {
    max-height: 500px;
    padding: 20px;
  }
  
  .faq-answer p {
    line-height: 1.6;
    color: var(--text);
  }
</style>