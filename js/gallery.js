/**
 * Choice Beauty Salon — Gallery & Lightbox Handler (gallery.js)
 * Implements category filtering and an accessible lightbox modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFiltering();
  initLightbox();
});

function initGalleryFiltering() {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.gallery-item');

  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Build lightbox modal if not in DOM
  let modal = document.getElementById('gallery-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'gallery-lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-btn lightbox-close" aria-label="Close modal">&times;</button>
        <button class="lightbox-btn lightbox-prev" aria-label="Previous image">&#10094;</button>
        <button class="lightbox-btn lightbox-next" aria-label="Next image">&#10095;</button>
        <div class="lightbox-figure">
          <img class="lightbox-img" src="" alt="Gallery Image Preview" />
          <div class="lightbox-caption">
            <h4 class="lightbox-title"></h4>
            <p class="lightbox-desc"></p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add styles for the lightbox
    const style = document.createElement('style');
    style.textContent = `
      .lightbox-modal {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.25s ease;
      }
      .lightbox-modal.active {
        display: flex;
        opacity: 1;
      }
      .lightbox-overlay {
        position: absolute;
        inset: 0;
        background: rgba(18, 10, 7, 0.92);
        backdrop-filter: blur(10px);
      }
      .lightbox-content {
        position: relative;
        z-index: 2;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .lightbox-figure {
        max-width: 860px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .lightbox-img {
        max-width: 100%;
        max-height: 72vh;
        object-fit: contain;
        border-radius: var(--radius-md);
        box-shadow: 0 16px 40px rgba(0,0,0,0.5);
      }
      .lightbox-caption {
        margin-top: 1rem;
        text-align: center;
        color: #FFFFFF;
      }
      .lightbox-title {
        font-family: var(--font-serif);
        font-size: 1.5rem;
        color: #FFFFFF;
        margin-bottom: 4px;
      }
      .lightbox-desc {
        font-size: 0.95rem;
        color: var(--color-accent-light);
      }
      .lightbox-btn {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255,255,255,0.3);
        color: #FFFFFF;
        cursor: pointer;
        font-size: 1.6rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        backdrop-filter: blur(4px);
      }
      .lightbox-btn:hover {
        background: var(--color-primary);
        color: #FFF;
      }
      .lightbox-close {
        position: absolute;
        top: -54px;
        right: 0;
        font-size: 2rem;
      }
      .lightbox-prev {
        position: absolute;
        left: -64px;
        top: 50%;
        transform: translateY(-50%);
      }
      .lightbox-next {
        position: absolute;
        right: -64px;
        top: 50%;
        transform: translateY(-50%);
      }
      @media (max-width: 768px) {
        .lightbox-prev { left: 10px; }
        .lightbox-next { right: 10px; }
        .lightbox-close { top: -48px; right: 10px; }
      }
    `;
    document.head.appendChild(style);
  }

  let currentIndex = 0;
  const itemsArray = Array.from(galleryItems);

  function openLightbox(index) {
    currentIndex = index;
    const item = itemsArray[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-title')?.textContent || '';
    const subtitle = item.querySelector('.gallery-subtitle')?.textContent || '';

    const modalImg = modal.querySelector('.lightbox-img');
    const modalTitle = modal.querySelector('.lightbox-title');
    const modalDesc = modal.querySelector('.lightbox-desc');

    modalImg.src = img.src;
    modalImg.alt = img.alt || title;
    modalTitle.textContent = title;
    modalDesc.textContent = subtitle;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % itemsArray.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + itemsArray.length) % itemsArray.length;
    openLightbox(currentIndex);
  }

  itemsArray.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  modal.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  modal.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
  modal.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
  modal.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}
