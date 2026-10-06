/**
 * Choice Beauty Salon — Core JavaScript (main.js)
 * Coordinates Navigation, Hours Status, Hero Video, Toast Notifications, and Scroll Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initHoursWidget();
  initHeroVideo();
  initBookingButtons();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Sticky Header
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn?.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn?.setAttribute('aria-expanded', 'false');
  };

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking nav links in drawer
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Real-Time Opening Hours Indicator (IST Timezone)
   -------------------------------------------------------------------------- */
function initHoursWidget() {
  const hoursBadges = document.querySelectorAll('.hours-status-badge');
  const hoursTable = document.querySelector('.hours-table');

  if (typeof SALON_CONFIG === 'undefined') return;

  // Calculate current time in Asia/Kolkata (IST, UTC+5:30)
  const now = new Date();
  const istDateString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const istDate = new Date(istDateString);
  
  const currentDay = istDate.getDay(); // 0 = Sunday, 1 = Monday...
  const currentHour = istDate.getHours();
  const currentMinute = istDate.getMinutes();
  const currentTimeDec = currentHour + (currentMinute / 60);

  const daySchedule = SALON_CONFIG.hours.schedule[currentDay];
  let isOpen = false;

  if (daySchedule && daySchedule.isOpen) {
    const [openH, openM] = daySchedule.open.split(':').map(Number);
    const [closeH, closeM] = daySchedule.close.split(':').map(Number);
    const openDec = openH + (openM / 60);
    const closeDec = closeH + (closeM / 60);

    if (currentTimeDec >= openDec && currentTimeDec < closeDec) {
      isOpen = true;
    }
  }

  // Update Status Badges
  hoursBadges.forEach(badge => {
    const dot = badge.querySelector('.status-dot');
    const text = badge.querySelector('.status-text');

    if (isOpen) {
      dot?.classList.remove('closed');
      dot?.classList.add('open');
      if (text) text.textContent = 'Open Now (Opens at 10:00 AM)';
    } else {
      dot?.classList.remove('open');
      dot?.classList.add('closed');
      if (text) text.textContent = 'Closed Now • Opens at 10:00 AM';
    }
  });

  // Highlight Today in Hours Table if present
  if (hoursTable) {
    const rows = hoursTable.querySelectorAll('tr[data-day]');
    rows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === currentDay) {
        row.classList.add('today');
        const dayLabel = row.querySelector('.day-name');
        if (dayLabel && !dayLabel.querySelector('.today-indicator')) {
          const pill = document.createElement('span');
          pill.className = 'today-indicator';
          pill.textContent = ' (Today)';
          pill.style.fontSize = '0.8rem';
          pill.style.color = 'var(--color-primary)';
          pill.style.fontWeight = 'bold';
          dayLabel.appendChild(pill);
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Continuous Hero Video Playback (Always Playing)
   -------------------------------------------------------------------------- */
function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Enforce autoplay & loop requirements across all browsers
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('loop', '');
  video.setAttribute('autoplay', '');

  const startPlayback = () => {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Will resume on interaction if browser power-saving applies
      });
    }
  };

  startPlayback();

  // Keep playing continuously all the time
  video.addEventListener('pause', () => {
    startPlayback();
  });

  video.addEventListener('ended', () => {
    startPlayback();
  });

  // Resume immediately when tab or window becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && video.paused) {
      startPlayback();
    }
  });

  // Fallback trigger on first mobile touch or scroll
  ['click', 'touchstart', 'scroll'].forEach(evt => {
    window.addEventListener(evt, () => {
      if (video.paused) {
        startPlayback();
      }
    }, { passive: true, once: true });
  });
}

/* --------------------------------------------------------------------------
   5. Booking Buttons & Toast Notification
   -------------------------------------------------------------------------- */
function initBookingButtons() {
  const bookingLinks = document.querySelectorAll('a[href*="simplybook.me"], .btn-booking');
  
  bookingLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      showToast('Opening SimplyBook.me Appointment System...');
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* --------------------------------------------------------------------------
   6. Scroll Reveal Observer
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }
}
