import { useEffect, useState } from 'react';
import { getReferralCookie, initReferralTracking, clearReferralCookie } from '@/utils/referral';
import { storeApi } from '@/lib/store';

export const useReferral = () => {
  const [referralId, setReferralId] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Initialize referral tracking on mount
    initReferralTracking();
    
    // Get current referral ID from cookie
    const currentRef = getReferralCookie();
    setReferralId(currentRef);
  }, []);

  const sendReferralConversion = async (newUserId: string) => {
    const refId = getReferralCookie();
    if (!refId || !newUserId) return false;

    try {
      setIsTracking(true);
      
      // Send API request to register referral conversion
      const response = await fetch(`${storeApi.baseURL}/referrals/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralId: refId,
          newUserId: newUserId,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Clear the referral cookie after successful conversion
        clearReferralCookie();
        setReferralId(null);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error sending referral conversion:', error);
      return false;
    } finally {
      setIsTracking(false);
    }
  };

  const getCurrentReferral = () => {
    return getReferralCookie();
  };

  return {
    referralId,
    isTracking,
    sendReferralConversion,
    getCurrentReferral
  };
};