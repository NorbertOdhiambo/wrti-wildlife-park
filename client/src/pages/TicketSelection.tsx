/**
 * Ticket Selection Page
 *
 * The WRTI Wildlife Park ticket selection screen.
 * Implements the Stitch design with pixel-close fidelity.
 *
 * Design Reference: ticket_selection from Stitch export
 * Route: /tickets
 *
 * Color Palette (from Stitch):
 * - Primary: #006b2c (dark green)
 * - On-Primary: #ffffff (white)
 * - Surface: #f0fbfe (light background)
 * - Surface-Container-Lowest: #ffffff (card background)
 * - On-Surface: #131d1f (dark text)
 * - On-Surface-Variant: #3e4a3d (muted text)
 * - Secondary: #1a6c3b (green for icons)
 * - Surface-Tint: #056d2e (darker green for hover)
 */

import { useState } from 'react';
import { useLocation } from 'wouter';
import { DetailHeader } from '@/design-system/components/Headers';
import { BottomNavigation } from '@/design-system/components/BottomNavigation';

interface TicketOption {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const TICKET_OPTIONS: TicketOption[] = [
  {
    id: 'standard',
    name: 'Standard Day Pass',
    price: 35,
    features: ['Park Entry', 'Basic Interactive Map'],
    isPopular: false,
  },
  {
    id: 'discovery',
    name: 'Discovery Pro Pass',
    price: 55,
    features: ['Standard Pass Features', 'AR Animal Tracking', 'Curated Audio Stories'],
    isPopular: true,
  },
  {
    id: 'researcher',
    name: 'Researcher Access',
    price: 95,
    features: ['All Pro Features', 'Full Bio-Data Access', 'Offline Map Downloads'],
    isPopular: false,
  },
];

export default function TicketSelection() {
  const [, navigate] = useLocation();
  const [selectedTicket, setSelectedTicket] = useState<string>('discovery');

  const handleSelectTicket = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const handleContinue = () => {
    navigate('/checkout');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#f0fbfe' }}>
      {/* Detail Header */}
      <DetailHeader
        title="WRTI Wildlife Park"
        onBack={handleBack}
        showBackButton
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Page Title Section - Centered */}
        <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto text-center">
          <h1
            className="font-display text-5xl sm:text-6xl font-bold mb-3 leading-tight"
            style={{ color: '#131d1f' }}
          >
            Select Your Experience
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ color: '#3e4a3d' }}
          >
            Choose the perfect pass for your ecological adventure.
          </p>
        </div>

        {/* Ticket Cards */}
        <div className="px-4 sm:px-6 pb-8 max-w-2xl mx-auto space-y-4">
          {TICKET_OPTIONS.map((ticket) => {
            const isSelected = selectedTicket === ticket.id;

            return (
              <div key={ticket.id} className="relative">
                {/* Most Popular Badge - Full Width */}
                {ticket.isPopular && (
                  <div
                    className="w-full py-2 text-center font-bold text-sm uppercase tracking-wider rounded-t-xl relative z-20"
                    style={{
                      backgroundColor: '#006b2c',
                      color: '#ffffff',
                      marginBottom: '-1px',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Ticket Card */}
                <div
                  className={`rounded-xl p-6 sm:p-8 flex flex-col ${
                    ticket.isPopular ? 'rounded-t-none' : ''
                  }`}
                  style={{
                    backgroundColor: '#ffffff',
                    border: isSelected
                      ? '2px solid #006b2c'
                      : ticket.isPopular
                        ? '2px solid #006b2c'
                        : '1px solid #d9e4e7',
                    boxShadow: isSelected || ticket.isPopular ? '0 4px 12px rgba(0, 107, 44, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* Ticket Header */}
                  <div className="mb-4">
                    <h2
                      className="font-display text-2xl sm:text-3xl font-bold mb-2"
                      style={{ color: '#131d1f' }}
                    >
                      {ticket.name}
                    </h2>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-3xl sm:text-4xl font-bold"
                        style={{ color: '#006b2c' }}
                      >
                        ${ticket.price}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: '#3e4a3d' }}
                      >
                        /person
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {ticket.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#1a6c3b' }}
                        >
                          <svg
                            className="w-3 h-3"
                            fill="white"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span
                          className="text-sm sm:text-base"
                          style={{ color: '#3e4a3d' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={() => handleSelectTicket(ticket.id)}
                    className="w-full py-3 px-4 rounded-full font-semibold transition-all duration-200 text-base"
                    style={{
                      backgroundColor: isSelected || ticket.isPopular ? '#006b2c' : 'transparent',
                      color: isSelected || ticket.isPopular ? '#ffffff' : '#006b2c',
                      border: isSelected || ticket.isPopular ? 'none' : '2px solid #006b2c',
                    }}
                    onMouseEnter={(e) => {
                      if (isSelected || ticket.isPopular) {
                        e.currentTarget.style.backgroundColor = '#056d2e';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isSelected || ticket.isPopular) {
                        e.currentTarget.style.backgroundColor = '#006b2c';
                      }
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <button
            onClick={handleContinue}
            className="w-full py-3 px-4 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
            style={{
              backgroundColor: '#006b2c',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#056d2e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#006b2c';
            }}
          >
            Continue to Payment
            <span>→</span>
          </button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20" />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        items={[
          { id: 'map', label: 'Map', icon: 'map' },
          { id: 'discovery', label: 'Discovery', icon: 'compass' },
          { id: 'tickets', label: 'Tickets', icon: 'ticket' },
          { id: 'profile', label: 'Profile', icon: 'user' },
        ]}
        activeId="tickets"
        onNavigate={(id: string) => {
          switch (id) {
            case 'map':
              navigate('/map');
              break;
            case 'discovery':
              navigate('/discovery');
              break;
            case 'tickets':
              navigate('/tickets');
              break;
            case 'profile':
              navigate('/profile');
              break;
          }
        }}
      />
    </div>
  );
}
