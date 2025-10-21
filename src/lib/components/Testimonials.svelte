<script>
  import { onMount } from 'svelte';
  import siteData from '$lib/data/siteData.json';
  
  let currentSlide = 0;
  let carouselTrack;
  
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }
  
  function updateCarousel() {
    if (carouselTrack) {
      const slides = carouselTrack.querySelectorAll('.carousel-slide-test');
      if (slides.length > 0) {
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
      }
    }
  }
  
  onMount(() => {
    updateCarousel();
    window.addEventListener('resize', updateCarousel);
    
    return () => {
      window.removeEventListener('resize', updateCarousel);
    };
  });
</script>

<section id="testimonials" class="testimonials-section" aria-labelledby="testimonials-title">
  <div class="container">
    <div class="section-title">
      <h2 id="testimonials-title">{siteData.testimonials.title}</h2>
      <p>{siteData.testimonials.subtitle}</p>
    </div>
    
    <!-- Desktop Testimonials Grid -->
    <div class="desktop-testimonials">
      <div class="outerdiv-test">
        <div class="innerdiv-test">
          {#each siteData.testimonials.items as testimonial, index}
            <div class="div{index + 1}-test eachdiv-test {testimonial.theme === 'dark' ? 'dark-theme' : ''}">
              <div class="userdetails-test">
                <div class="imgbox-test">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name} profile picture`}
                    width="40"
                    height="40"
                    loading="lazy"
                  />
                </div>
                <div class="detbox-test">
                  <p class="name-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                    {testimonial.name}
                  </p>
                  <p class="designation-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div class="review-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                <h4>{testimonial.title}</h4>
                <p>{testimonial.content}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Mobile Testimonials Carousel -->
    <div class="mobile-testimonials">
      <div class="testimonials-carousel-test">
        <div class="carousel-container-test">
          <div class="carousel-track-test" bind:this={carouselTrack}>
            {#each siteData.testimonials.items as testimonial}
              <div class="carousel-slide-test">
                <div class="testimonial-card-test {testimonial.theme === 'dark' ? 'dark-theme' : ''}">
                  <div class="userdetails-test">
                    <div class="imgbox-test">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.name} profile picture`}
                        width="40"
                        height="40"
                        loading="lazy"
                      />
                    </div>
                    <div class="detbox-test">
                      <p class="name-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                        {testimonial.name}
                      </p>
                      <p class="designation-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div class="review-test {testimonial.theme === 'dark' ? 'dark-test' : ''}">
                    <h4>{testimonial.title}</h4>
                    <p>{testimonial.content}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="carousel-indicators-test" aria-label="Testimonial navigation">
          {#each siteData.testimonials.items as _, index}
            <button
              class="indicator-test {currentSlide === index ? 'active-test' : ''}"
              on:click={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={currentSlide === index}
            ></button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .testimonials-section {
    padding: 80px 0;
  }

  /* Desktop Testimonials */
  .desktop-testimonials {
    display: block;
  }
  .mobile-testimonials {
    display: none;
  }

  .outerdiv-test {
    width: 100%;
    background: var(--light);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
  }

  .innerdiv-test {
    margin: 1rem;
    display: grid;
    grid-gap: 1.5rem;
    grid-template-rows: repeat(2, 22rem);
    grid-template-columns: repeat(4, 17rem);
  }

  .eachdiv-test {
    padding: 1.5rem 2rem;
    border-radius: 0.8rem;
    box-shadow: var(--shadow);
    color: white;
    transition: var(--transition);
  }
  .eachdiv-test:hover {
    transform: translateY(-5px);
  }

  .div1-test {
    background: #733FC8;
    grid-column: 1/3;
    grid-row: 1/2;
    background-image: url(https://raw.githubusercontent.com/RahulSahOfficial/testimonials_grid_section/5532c958b7d3c9b910a216b198fdd21c73112d84/images/bg-pattern-quotation.svg);
    background-repeat: no-repeat;
    background-position-x: 80%;
  }
  .div2-test { background: #49556B; grid-column: 3/4; grid-row: 1/2; }
  .div3-test { background: white; grid-column: 4/5; grid-row: 1/3; color: #000;  }
  .div4-test { background: white; grid-column: 1/2; grid-row: 2/3; color: #000; }
  .div5-test { background: #18202D; grid-column: 2/4; grid-row: 2/3; color:#fff;}

  .userdetails-test {
    display: flex;
    margin-bottom: 1rem;
  }
  .imgbox-test img {
    border-radius: 50%;
    width: 2.5rem;
    border: 2px solid #cec5c5;
  }

  .detbox-test {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
  }
  .detbox-test .name-test {
    font-size: 0.9rem;
    margin-bottom: 0.1rem;
    font-weight: 600;
    /* color: hsl(0, 0%, 81%); */
  }
  .detbox-test .designation-test {
    font-size: 0.8rem;
    opacity: 70%;
    /* color: hsl(0, 0%, 81%); */
  }

  .review-test h4 {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  .review-test p {
    font-size: 0.9rem;
    opacity: 80%;
    line-height: 1.5;

  }

  /* Mobile Testimonials Carousel */
  .testimonials-carousel-test {
    position: relative;
    margin: 0 auto;
    max-width: 100%;
    overflow: hidden;
  }
  .carousel-container-test {
    overflow: hidden;
    width: 100%;
  }
  .carousel-track-test {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }
  .carousel-slide-test {
    min-width: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .testimonial-card-test {
    background: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: var(--shadow);
    color: var(--text);
    box-sizing: border-box;
  }

  .carousel-indicators-test {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
  }
  .indicator-test {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ddd;
    cursor: pointer;
    border: none;
    transition: 0.3s ease;
  }
  .indicator-test.active-test {
    background: var(--primary);
  }

  /* Responsive Fixes */
  @media only screen and (max-width: 768px) {
    .desktop-testimonials { display: none; }
    .mobile-testimonials { display: block; }

    .testimonial-card-test {
      max-width: 90vw;
      margin: 0 auto;
    }
    .review-test h4 {
      max-width: 400px;
      color:#000;
    }
    .review-test p {
      max-width: 400px;
      color: #000;
    }
    .detbox-test{
      color:#000;
    }
  }
</style>
