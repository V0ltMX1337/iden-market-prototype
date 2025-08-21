import { useEffect } from 'react';
import { useReferral } from '@/hooks/useReferral';

const ReferralTracker = () => {
  const { referralId } = useReferral();

  useEffect(() => {
    // Initialize referral tracking when the app loads
    // This component doesn't render anything but handles referral logic
  }, [referralId]);

  // This component doesn't render anything
  return null;
};

export default ReferralTracker;