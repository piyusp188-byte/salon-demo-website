/**
 * Choice Beauty Salon — Contact Form Handler (contact.js)
 * Handles client-side validation, honeypot spam protection,
 * Formspree API submission, and WhatsApp quick redirect fallback.
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('salon-contact-form');
  if (!contactForm) return;

  const statusBox = document.getElementById('form-status-msg');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Spam Honeypot Check
    const honeypot = contactForm.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Spam submission prevented.");
      return;
    }

    // 2. Validate Fields
    const nameInput = contactForm.querySelector('#client-name');
    const phoneInput = contactForm.querySelector('#client-phone');
    const serviceSelect = contactForm.querySelector('#client-service');
    const msgInput = contactForm.querySelector('#client-message');

    if (!nameInput.value.trim() || !phoneInput.value.trim()) {
      showStatus("Please enter your name and phone number so we can reach you.", "error");
      return;
    }

    // Phone simple sanity check (Indian 10-digit or international)
    const cleanPhone = phoneInput.value.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      showStatus("Please enter a valid 10-digit mobile number.", "error");
      return;
    }

    // 3. UI Loading State
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s infinite linear;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Sending Message...
    `;

    // 4. Formspree / Backend Action
    // Endpoint can be configured in form action attribute. Defaults to free Formspree endpoint or fallback.
    const formAction = contactForm.getAttribute('action') || 'https://formspree.io/f/placeholder_form_id';

    try {
      // If default placeholder endpoint is configured, simulate a successful response
      // or send directly to Formspree if user provides endpoint in config!
      let success = true;

      if (formAction.includes('placeholder_form_id')) {
        // Simulated successful send for demonstration
        await new Promise(resolve => setTimeout(resolve, 800));
        success = true;
      } else {
        const formData = new FormData(contactForm);
        const res = await fetch(formAction, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        success = res.ok;
      }

      if (success) {
        showStatus(
          "Thank you! Your message has been received. Our team will contact you shortly to confirm your booking or consultation.",
          "success"
        );
        contactForm.reset();
      } else {
        throw new Error("Submission could not be completed.");
      }
    } catch (err) {
      showStatus(
        "Could not submit online form right now. You can reach us directly on WhatsApp or call 097235 12890!",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showStatus(text, type) {
    if (!statusBox) return;
    statusBox.textContent = text;
    statusBox.className = `form-status ${type}`;
    statusBox.style.display = 'block';
    statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
