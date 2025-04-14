<script lang="ts">
    import { onMount } from 'svelte';
    import { consentStore } from '$lib/stores/consentStore';
    
    // QOL: Hide banner until localStorage is checked
    let showBanner = false;
    let showModal = false;
    let analytics = false;
    let thirdParty = false;
    
    onMount(() => {
      const hasConsent = consentStore.hasValidConsent();
      showBanner = !hasConsent;
      
      // Subscribe consentStore
      consentStore.subscribe((state) => {
        analytics = state.analytics === 'accepted';
        thirdParty = state.thirdParty === 'accepted';
      });
    });
    
    function acceptAll() {
      consentStore.acceptAll();
      showBanner = false;
    }
    
    function declineAll() {
      consentStore.declineAll();
      showBanner = false;
    }
    
    function openSettings() {
      showModal = true;
    }
    
    function closeSettings() {
      showModal = false;
    }
    
    function saveSettings() {
      consentStore.savePreferences(analytics, thirdParty);
      showBanner = false;
      showModal = false;
    }
</script>
  
  {#if showBanner}
  <section class="cookie-banner">
    <div class="cookie-banner-content">
        <span class="cookie-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z" fill="currentColor"/>
            </svg>
        </span>
        <p class="cookie-text">We utilize cookies and analytics to provide you with the best possible experience.<br /><a href="/cookie-policy" class="cookie-link">Cookie Policy</a>. </p>
    </div>
    <div class="cookie-actions">
        <button class="cookie-preferences-btn" id="cookieSettingsBtn" on:click={openSettings}>
            Preferences
        </button>
        <button class="cookie-btn cookie-decline-btn" on:click={declineAll}>
            Decline
        </button>
        <button class="cookie-btn cookie-accept-btn" on:click={acceptAll}>
            Accept
        </button>
    </div>
  </section>
  {/if}
  
  {#if showModal}
  <div class="cookie-modal-overlay">
    <div class="cookie-modal">
      <h2 class="cookie-modal-title">Cookie Settings</h2>
      <div class="cookie-modal-content">
        <div class="cookie-form-control">
          <label class="cookie-label">
            <span class="label-text">Strictly Necessary</span> 
            <input type="checkbox" class="cookie-toggle" checked disabled />
          </label>
          <p class="cookie-description">We utilize essential cookies and storage technologies required for this website.<br />For further details, please refer to our <a href="/cookie-policy" class="cookie-modal-link">Cookie Policy</a>.</p>
        </div>
        <div class="cookie-form-control">
            <label class="cookie-label">
              <span class="label-text">Analytics</span> 
              <input type="checkbox" class="cookie-toggle" id="consentAnalyticsSettings" bind:checked={analytics} />
            </label>
            <p class="cookie-description">Our analytics tools may involve third-party services that use cookies. <br />For further details, please refer to our <a href="/cookie-policy" class="cookie-modal-link">Analytics Policy and Information Page</a></p>
          </div>
          <div class="cookie-form-control">
            <label class="cookie-label">
              <span class="label-text">Other Third Party</span> 
              <input type="checkbox" class="cookie-toggle" id="consentThirdPartySettings" bind:checked={thirdParty} />
            </label>
            <p class="cookie-description">Third-party cookies may be set by other platforms utilized by this website to optimize content delivery. <br />For further details, please refer to our <a href="/cookie-policy"class="cookie-modal-link">Cookie Policy</a></p>
          </div>
          
        </div>
    <div class="cookie-modal-actions">
      <button class="cookie-btn" on:click={closeSettings}>Cancel</button>
      <button class="cookie-btn" on:click={saveSettings}>Save Choices</button>
    </div>
    </div>
  </div>
  {/if}
  
  <style>
    .cookie-banner {
      position: fixed;
      max-width: 42rem;
      padding: 1rem;
      margin-left: auto;
      margin-right: auto;
      background-color: black;
      border: 1px solid #e5e7eb;
      left: 3rem;
      bottom: 4rem;
      border-radius: 1rem;
      z-index: 99;
    }
    @media (prefers-color-scheme: dark) {
      .cookie-banner {
        border-color: #374151;
      }
    }
  
    @media (min-width: 768px) {
      .cookie-banner {
        display: flex;
        align-items: center;
        column-gap: 1rem;
      }
    }
  
    .cookie-banner-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .cookie-icon {
      display: inline-flex;
      padding: 0.5rem;
      color: #3b82f6;
      border-radius: 0.5rem;
      flex-shrink: 0;
      background-color: rgba(219, 234, 254, 0.8);
    }
  
    @media (prefers-color-scheme: dark) {
      .cookie-icon {
        background-color: #1f2937;
      }
    }
  
    .cookie-text {
      font-size: 0.875rem;
      color: #4b5563;
    }
  
    @media (prefers-color-scheme: dark) {
      .cookie-text {
        color: #d1d5db;
      }
    }
  
    .cookie-link {
      color: #14b8a6;
    }
  
    .cookie-link:hover {
      text-decoration: underline;
    }
  
    .cookie-actions {
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      gap: 1rem;
      flex-shrink: 0;
    }
  
    @media (min-width: 1024px) {
      .cookie-actions {
        margin-top: 0;
      }
    }
  
    .cookie-preferences-btn {
      font-size: 0.75rem;
      text-decoration: underline;
      transition-property: color, background-color;
      transition-duration: 300ms;
      color: #1f2937;
    }
  
    @media (prefers-color-scheme: dark) {
      .cookie-preferences-btn {
        color: white;
      }
    }
  
    .cookie-preferences-btn:hover {
      color: #65c7bc;
      background-color: transparent;
    }
  
    .cookie-preferences-btn:focus {
      outline: none;
    }
  
    .cookie-btn {
      font-size: 0.75rem;
      font-weight: 500;
      background-color: #1f2937;
      border-radius: 0.5rem;
      color: white;
      padding: 0.625rem 1rem;
      transition-property: color, background-color;
      transition-duration: 300ms;
    }
  
    .cookie-btn:hover {
      background-color: #65c7bc;
    }
  
    .cookie-btn:focus {
      outline: none;
    }
  
    /* Modal */
    .cookie-modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
    }
  
    .cookie-modal {
      padding: 1rem;
      border-radius: 0.5rem;
      background-color: rgba(0, 0, 0, 0.5);
    }
  
    .cookie-modal-title {
      font-size: 1.125rem;
    }
  
    .cookie-modal-content {
      display: flex;
      flex-direction: column;
    }
  
    .cookie-form-control {
      width: 18rem;
    }
  
    .cookie-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      cursor: pointer;
    }
    .cookie-toggle {
      position: relative;
      appearance: none;
      width: 3.5rem;
      height: 1.75rem;
      background-color: #e5e7eb;
      border-radius: 1rem;
      transition: background-color 0.3s;
      cursor: pointer;
    }
  
    .cookie-toggle:checked {
      background-color: #10b981;
    }
  
    .cookie-toggle:before {
      content: "";
      position: absolute;
      left: 0.25rem;
      top: 0.25rem;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      background-color: white;
      transform: translateX(0);
      transition: transform 0.3s;
    }
  
    .cookie-toggle:checked:before {
      transform: translateX(1.75rem);
    }
  
    .cookie-toggle:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  
    .cookie-description {
      padding-left: 0.375rem;
      font-size: 0.75rem;
      font-weight: 100;
    }
  
    .cookie-modal-link {
      color: #9333ea;
    }
  
    .cookie-modal-link:hover {
      text-decoration: underline;
    }
  
    .cookie-modal-actions {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }
  </style>