/**
 * JAY PARMAR - PORTFOLIO INTERACTIVITY SCRIPT
 * High Performance, Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initInteractiveTerminal();
  initAiSandbox();
  initSkillsFilter();
  initCertificatesLightbox();
  initClipboardToast();
  initLiveClock();
  initContactForm();
  initActiveNavTracking();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('jay_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jay_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById('theme-icon');
  if (!iconContainer) return;
  
  if (theme === 'light') {
    iconContainer.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
  } else {
    iconContainer.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-card, .mobile-nav-link');
  if (!mobileBtn || !drawer) return;

  const hamburgerSvg = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;

  const closeSvg = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;

  function closeDrawer() {
    drawer.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.innerHTML = hamburgerSvg;
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function openDrawer() {
    drawer.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileBtn.innerHTML = closeSvg;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Auto-close if screen resized above mobile breakpoint (992px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Interactive Terminal Box
   ========================================================================== */
function initInteractiveTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const termButtons = document.querySelectorAll('.term-action-btn');
  if (!terminalBody) return;

  const commands = {
    'jay.bio()': () => `
<div class="terminal-line"><span class="terminal-prompt">&gt;</span> <span class="terminal-cmd">jay.bio()</span></div>
<div class="terminal-line terminal-out">
  • <strong>Name:</strong> Jay Parmar (Jay Harikrushnabhai Parmar)<br>
  • <strong>Education:</strong> Bachelor of Computer Application (BCA), Gyanmanjari Innovative University<br>
  • <strong>Core Focus:</strong> Practical AI/ML applications, Computer Vision pipelines, and robust web deployment.<br>
  • <strong>Location:</strong> Bhavnagar, Gujarat, India (IST +05:30)<br>
  • <strong>Languages:</strong> English, Gujarati (Native), Hindi, Sanskrit
</div>`,

    'jay.stack()': () => `
<div class="terminal-line"><span class="terminal-prompt">&gt;</span> <span class="terminal-cmd">jay.stack()</span></div>
<div class="terminal-line terminal-out">
  • <strong>AI/ML & Vision:</strong> OpenCV, Scikit-Learn, Pandas, NumPy, NLP, Generative AI & LLMs, Tesseract OCR<br>
  • <strong>Programming:</strong> Python (OOP, Automation), C, C++, Java, PHP, JavaScript, SQL<br>
  • <strong>Backend & DB:</strong> REST APIs, Flask, MySQL, Apache, Relational Modeling<br>
  • <strong>Deployment:</strong> Netlify, Render, Git/GitHub, Linux/Windows
</div>`,

    'jay.projects()': () => `
<div class="terminal-line"><span class="terminal-prompt">&gt;</span> <span class="terminal-cmd">jay.projects()</span></div>
<div class="terminal-line terminal-out">
  1. <strong>Sri Sri HealthCare:</strong> Multilingual conversational triage & contactless vitals estimation.<br>
  2. <strong>Sri Sri AI CA:</strong> Document AI OCR invoice ledger extraction & tax simulation engine.<br>
  3. <strong>Sri Sri SOS AI:</strong> Emergency acoustic scream distress recognition & street safety telemetry.<br>
  <span class="terminal-highlight">↳ All 3 platforms have live web demos and active GitHub repositories!</span>
</div>`,

    'jay.contact()': () => `
<div class="terminal-line"><span class="terminal-prompt">&gt;</span> <span class="terminal-cmd">jay.contact()</span></div>
<div class="terminal-line terminal-out">
  • <strong>Email:</strong> jayparmar4450@gmail.com<br>
  • <strong>Phone / WhatsApp:</strong> +91 9714611331<br>
  • <strong>GitHub:</strong> github.com/jayparmarsrisri111<br>
  • <strong>Status:</strong> <span style="color:#10b981">Available for Software Engineer / AI Developer opportunities.</span>
</div>`,

    'clear': () => {
      terminalBody.innerHTML = `
<div class="terminal-line"><span class="terminal-prompt">jay@terminal:~$</span> <span class="terminal-cmd">system.init()</span></div>
<div class="terminal-line terminal-out">Terminal session reset. Click any button below or run commands:</div>`;
      return null;
    }
  };

  termButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmdKey = btn.getAttribute('data-cmd');
      if (cmdKey && commands[cmdKey]) {
        const result = commands[cmdKey]();
        if (result) {
          terminalBody.insertAdjacentHTML('beforeend', result);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      }
    });
  });
}

/* ==========================================================================
   4. Interactive AI Sandbox Demo
   ========================================================================== */
function initAiSandbox() {
  const tabButtons = document.querySelectorAll('.sandbox-tab-btn');
  const tabPanels = document.querySelectorAll('.sandbox-tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Demo 1: Vitals Simulator (Sri Sri HealthCare)
  const runVitalsBtn = document.getElementById('run-vitals-demo');
  const vitalsConsole = document.getElementById('vitals-console-out');
  const bpmDisplay = document.getElementById('vitals-bpm-val');
  const spo2Display = document.getElementById('vitals-spo2-val');

  if (runVitalsBtn && vitalsConsole) {
    let vitalsInterval = null;
    runVitalsBtn.addEventListener('click', () => {
      runVitalsBtn.disabled = true;
      runVitalsBtn.innerText = 'Analyzing Facial PPG Feed...';
      vitalsConsole.innerHTML = '<span style="color:#60a5fa">[STREAM INITIALIZED]</span> Capturing RGB frames (ROI: forehead + cheeks)...';

      let step = 0;
      clearInterval(vitalsInterval);

      vitalsInterval = setInterval(() => {
        step++;
        if (step === 1) {
          vitalsConsole.innerHTML += '<br><span style="color:#34d399">[OPENCV HAAR/DNN]</span> Face detected at bbox (x:142, y:88, w:210, h:210).';
        } else if (step === 2) {
          vitalsConsole.innerHTML += '<br><span style="color:#f2cc60">[SIGNAL FILTER]</span> Bandpass filter (0.7 - 3.5 Hz) applied to green color channel.';
        } else if (step === 3) {
          const simulatedBpm = Math.floor(72 + Math.random() * 5);
          const simulatedSpo2 = 98;
          if (bpmDisplay) bpmDisplay.textContent = simulatedBpm;
          if (spo2Display) spo2Display.textContent = simulatedSpo2 + '%';
          vitalsConsole.innerHTML += `<br><span style="color:#10b981">✓ [CONVERGENCE]</span> Calculated Heart Rate: <strong>${simulatedBpm} BPM</strong> | SpO2: <strong>98%</strong> | Confidence: 94.8%`;
          runVitalsBtn.disabled = false;
          runVitalsBtn.innerText = 'Re-Run Vitals Analysis';
          clearInterval(vitalsInterval);
        }
      }, 700);
    });
  }

  // Demo 2: Invoice Document AI Parser (Sri Sri AI CA)
  const runOcrBtn = document.getElementById('run-ocr-demo');
  const ocrConsole = document.getElementById('ocr-console-out');

  if (runOcrBtn && ocrConsole) {
    runOcrBtn.addEventListener('click', () => {
      runOcrBtn.disabled = true;
      runOcrBtn.innerText = 'Processing Document AI Pipeline...';
      ocrConsole.innerHTML = '<span style="color:#60a5fa">[DOCUMENT_AI]</span> Ingesting raw PDF/Image invoice payload...';

      setTimeout(() => {
        ocrConsole.innerHTML += '<br><span style="color:#34d399">[TESSERACT OCR]</span> Bounding box segmentation & tabular spatial clustering complete.';
      }, 500);

      setTimeout(() => {
        const outputJson = {
          invoice_number: "INV-2026-0894",
          vendor: "Tech Hardware Solutions Pvt Ltd",
          gstin: "24AAACG1234F1Z5",
          items: [
            { desc: "GPU Compute Server Rack", qty: 1, rate: 145000, hsn: "8471" },
            { desc: "Cat6 Ethernet Spool 300m", qty: 2, rate: 3500, hsn: "8544" }
          ],
          subtotal: 152000.00,
          cgst_9pct: 13680.00,
          sgst_9pct: 13680.00,
          net_payable: 179360.00,
          fifo_ledger_status: "AUTO_MATCHED_LEDGER_OK"
        };

        ocrConsole.innerHTML += `<br><pre style="color:#a78bfa; margin-top:0.5rem; font-size:0.75rem;">${JSON.stringify(outputJson, null, 2)}</pre>`;
        runOcrBtn.disabled = false;
        runOcrBtn.innerText = 'Re-Extract Invoice Data';
      }, 1100);
    });
  }

  // Demo 3: Acoustic Distress Detector (Sri Sri SOS AI)
  const runSosBtn = document.getElementById('run-sos-demo');
  const sosConsole = document.getElementById('sos-console-out');
  const sosRiskDisplay = document.getElementById('sos-risk-val');

  if (runSosBtn && sosConsole) {
    runSosBtn.addEventListener('click', () => {
      runSosBtn.disabled = true;
      runSosBtn.innerText = 'Sampling Acoustic Sensor...';
      sosConsole.innerHTML = '<span style="color:#60a5fa">[AUDIO INGEST]</span> Buffer sampling at 44.1kHz (Mel-Spectrogram transform)...';

      setTimeout(() => {
        sosConsole.innerHTML += '<br><span style="color:#f43f5e">⚠ [PEAK DETECTED]</span> High-frequency distress transient peak identified: 2840 Hz at 88.4 dB.';
      }, 600);

      setTimeout(() => {
        if (sosRiskDisplay) {
          sosRiskDisplay.textContent = 'HIGH ALERT (89%)';
          sosRiskDisplay.style.color = '#f43f5e';
        }
        sosConsole.innerHTML += '<br><span style="color:#f43f5e">🚨 [INCIDENT DISPATCHED]</span> SOS event transmitted via WebSocket to Police Control Room dashboard with GPS coordinates: 21.7645° N, 72.1519° E (Bhavnagar, GJ).';
        runSosBtn.disabled = false;
        runSosBtn.innerText = 'Simulate Another Acoustic Stream';
      }, 1300);
    });
  }
}

/* ==========================================================================
   5. Skills Matrix Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. Certificate Lightbox Modal
   ========================================================================== */
function initCertificatesLightbox() {
  const modal = document.getElementById('cert-modal');
  const modalImage = document.getElementById('modal-cert-image');
  const modalTitle = document.getElementById('modal-cert-title');
  const modalDownload = document.getElementById('modal-cert-download');
  const closeBtn = document.getElementById('modal-close-btn');
  const certCards = document.querySelectorAll('.cert-card');

  if (!modal || !modalImage) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgPath = card.getAttribute('data-cert-img');
      const title = card.getAttribute('data-cert-title');
      const dlPath = card.getAttribute('data-cert-download') || imgPath;

      modalImage.src = imgPath;
      modalImage.alt = title;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDownload) modalDownload.href = dlPath;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. Clipboard Copy & Toast Notification
   ========================================================================== */
function initClipboardToast() {
  const copyButtons = document.querySelectorAll('.copy-trigger');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-msg');

  let toastTimeout = null;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        if (toast && toastMessage) {
          toastMessage.textContent = `Copied to clipboard: ${textToCopy}`;
          toast.classList.add('show');

          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
          }, 3200);
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/* ==========================================================================
   8. Live IST Clock (Bhavnagar, Gujarat, India)
   ========================================================================== */
function initLiveClock() {
  const clockElement = document.getElementById('live-ist-clock');
  if (!clockElement) return;

  function updateClock() {
    try {
      const now = new Date();
      // Format to Indian Standard Time (Asia/Kolkata)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      clockElement.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
    } catch (e) {
      clockElement.textContent = 'Active (IST)';
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   9. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      if (feedback) {
        feedback.innerHTML = '<span style="color:#f43f5e">Please fill in your name, email, and message.</span>';
      }
      return;
    }

    // Direct mailto link fallback so user's message is never lost
    const mailtoLink = `mailto:jayparmar4450@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

    if (feedback) {
      feedback.innerHTML = `
        <span style="color:#10b981">✓ Message prepared! Opening email client...</span>
        <div style="margin-top:0.5rem; font-size:0.85rem; color:var(--text-secondary)">
          If your email client didn't open automatically, <a href="${mailtoLink}" style="color:var(--accent-blue); text-decoration:underline;">click here to send directly</a> or reach out on WhatsApp (+91 9714611331).
        </div>`;
    }

    // Trigger mailto after brief delay
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 400);
  });
}

/* ==========================================================================
   10. Active Nav Link Tracking on Scroll
   ========================================================================== */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}
