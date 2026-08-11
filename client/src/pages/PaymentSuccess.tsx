/**
 * Payment Success Page
 *
 * The WRTI Wildlife Park payment success confirmation screen.
 * Implements the Stitch design with HTML-first visual fidelity.
 *
 * Design Reference: payment_success from Stitch export
 * Route: /payment-success
 *
 * Color Palette (from Stitch):
 * - Primary: #006b2c (dark green)
 * - On-Primary: #ffffff (white)
 * - Background: #f0fbfe (light background)
 * - On-Background: #131d1f (dark text)
 * - On-Surface-Variant: #3e4a3d (muted text)
 * - Surface-Container-Lowest: #ffffff (white)
 * - Outline-Variant: rgba(0, 0, 0, 0.1)
 *
 * Animations:
 * - Success icon: float + fade-in
 * - Title: fade-in with delay-100
 * - Subtitle: fade-in with delay-200
 * - Receipt card: fade-in with delay-300
 * - Buttons: fade-in with delay-300
 */

import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface PaymentSuccessData {
  visitorName: string;
  confirmationNumber: string;
  passType: string;
  amount: number;
}

export default function PaymentSuccess() {
  const [, navigate] = useLocation();
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock data - in production, this would come from route state or API
  const paymentData: PaymentSuccessData = {
    visitorName: 'Alex',
    confirmationNumber: 'WLD-8492-X',
    passType: 'Annual Pass',
    amount: 120.0,
  };

  useEffect(() => {
    // Trigger animations on mount
    setIsAnimating(true);
  }, []);

  const handleViewPass = () => {
    // Navigate to tickets/pass view
    navigate('/tickets');
  };

  const handleExploreMap = () => {
    // Navigate to map
    navigate('/map');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#f0fbfe' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Cinematic sunlit forest clearing"
          className="w-full h-full object-cover"
          style={{ opacity: 0.8 }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8NyXBMzsmdLYNPyVQZzdZfEHdSsXCaKJlTDk9d1pmncKfHAsTjM7zFESrDI5Op3-XiLODA6LiYV9zKcrlS2dOT61BJK7yWi8W-aB2J14ZKDDiyZmw68atvvqU9G-UKrIMJyj_oPEgEMwlyRbGKmhSGU29e3MYdUq0Crae6Vz27yP5kPDaqJqax9BNn7dW6PWyf5wPV2BHXBqrEeL7DW7JwyKdtKDlaEROWj_19yL6sAAO7cWTaT3k6QiSOd1xUZIrbvwMUCuyr6gv"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to top, #f0fbfe, rgba(240, 251, 254, 0.4), transparent)',
          }}
        />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center">
        {/* Success Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-lg transition-all duration-700"
          style={{
            backgroundColor: 'rgba(0, 107, 44, 0.1)',
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
            style={{
              backgroundColor: '#006b2c',
            }}
          >
            <svg
              className="w-10 h-10"
              fill="#ffffff"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        {/* Typography */}
        <h1
          className="font-display text-4xl sm:text-5xl font-bold mb-3 leading-tight transition-all duration-700"
          style={{
            color: '#131d1f',
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '100ms',
          }}
        >
          Welcome to the Wild,
          <br />
          {paymentData.visitorName}.
        </h1>

        <p
          className="font-body text-base sm:text-lg leading-relaxed max-w-sm transition-all duration-700"
          style={{
            color: '#3e4a3d',
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '200ms',
          }}
        >
          Your contribution supports local conservation efforts and helps protect these habitats.
        </p>

        {/* Receipt Card (Glassmorphism) */}
        <div
          className="w-full rounded-xl p-6 mb-8 flex flex-col gap-4 transition-all duration-700 backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: '1px',
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '300ms',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Confirmation Number */}
          <div
            className="flex justify-between items-center pb-4"
            style={{
              borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              borderBottomWidth: '1px',
            }}
          >
            <span
              className="text-xs sm:text-sm font-semibold uppercase tracking-wider"
              style={{ color: '#3e4a3d' }}
            >
              Confirmation #
            </span>
            <span
              className="text-sm sm:text-base font-mono"
              style={{ color: '#131d1f' }}
            >
              {paymentData.confirmationNumber}
            </span>
          </div>

          {/* Pass Details */}
          <div className="flex justify-between items-center pt-4">
            <span
              className="text-sm sm:text-base"
              style={{ color: '#3e4a3d' }}
            >
              {paymentData.passType}
            </span>
            <span
              className="text-lg sm:text-2xl font-bold"
              style={{ color: '#006b2c' }}
            >
              ${paymentData.amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div
          className="w-full flex flex-col gap-3 transition-all duration-700"
          style={{
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
            transitionDelay: '300ms',
          }}
        >
          {/* View Pass Button */}
          <button
            onClick={handleViewPass}
            className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
            style={{
              backgroundColor: '#006b2c',
              color: '#ffffff',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#056d2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006b2c';
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            View Your Pass
          </button>

          {/* Explore Map Button */}
          <button
            onClick={handleExploreMap}
            className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95"
            style={{
              backgroundColor: '#ffffff',
              color: '#006b2c',
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderWidth: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
            </svg>
            Start Exploring Map
          </button>
        </div>
      </main>

      {/* Reduced Motion Support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
