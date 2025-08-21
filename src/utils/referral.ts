// Referral system utilities

const REFERRAL_COOKIE_NAME = 'trivo_ref';
const REFERRAL_COOKIE_DURATION = 30; // days

// Extract referral ID from URL
export const extractReferralId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const refParam = urlObj.searchParams.get('ref');
    
    // Validate referral ID format (should be numeric and reasonable length)
    if (refParam && /^\d{8,12}$/.test(refParam)) {
      return refParam;
    }
    
    // Also check for /ref=ID format in pathname
    const pathMatch = urlObj.pathname.match(/\/ref=(\d{8,12})/);
    if (pathMatch) {
      return pathMatch[1];
    }
    
    return null;
  } catch {
    return null;
  }
};

// Set referral cookie
export const setReferralCookie = (referralId: string): void => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + REFERRAL_COOKIE_DURATION * 24 * 60 * 60 * 1000);
  
  document.cookie = `${REFERRAL_COOKIE_NAME}=${referralId};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

// Get referral cookie
export const getReferralCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = `${REFERRAL_COOKIE_NAME}=`;
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

// Clear referral cookie
export const clearReferralCookie = (): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${REFERRAL_COOKIE_NAME}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Generate referral link
export const generateReferralLink = (userId: string, baseUrl = 'https://trivoads.ru'): string => {
  return `${baseUrl}/ref=${userId}`;
};

// Track referral click (for analytics)
export const trackReferralClick = (referralId: string): void => {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'referral_click', {
      custom_parameter_1: referralId,
      event_category: 'engagement'
    });
  }
};

// Track referral conversion
export const trackReferralConversion = (referralId: string, userId: string): void => {
  // Send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'referral_conversion', {
      custom_parameter_1: referralId,
      custom_parameter_2: userId,
      event_category: 'conversion'
    });
  }
};

// Initialize referral tracking on page load
export const initReferralTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  const currentUrl = window.location.href;
  const referralId = extractReferralId(currentUrl);
  
  if (referralId) {
    // Only set cookie if it doesn't exist or is different
    const existingRef = getReferralCookie();
    if (!existingRef || existingRef !== referralId) {
      setReferralCookie(referralId);
      trackReferralClick(referralId);
    }
    
    // Clean URL by removing ref parameter
    const url = new URL(currentUrl);
    url.searchParams.delete('ref');
    const cleanPath = url.pathname.replace(/\/ref=\d+/, '');
    
    if (cleanPath !== url.pathname || url.searchParams.has('ref')) {
      url.pathname = cleanPath;
      window.history.replaceState({}, '', url.toString());
    }
  }
};

// Validate referral ID
export const isValidReferralId = (id: string): boolean => {
  return /^\d{8,12}$/.test(id);
};

// Copy referral link to clipboard
export const copyReferralLink = async (link: string): Promise<boolean> => {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch {
      return false;
    }
  }
  
  try {
    await navigator.clipboard.writeText(link);
    return true;
  } catch {
    return false;
  }
};