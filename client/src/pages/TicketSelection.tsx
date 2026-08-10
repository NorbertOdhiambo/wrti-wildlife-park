/**
 * Ticket Selection Page
 *
 * The WRTI Wildlife Park ticket selection screen.
 * Implements the Stitch design with pixel-close fidelity.
 *
 * Design Reference: ticket_selection from Stitch export
 * Route: /tickets
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DetailHeader } from '@/design-system/components/Headers';
import { BottomNavigation } from '@/design-system/components/BottomNavigation';

import { useLocation } from 'wouter';

interface TicketOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const TICKET_OPTIONS: TicketOption[] = [
  {
    id: 'standard',
    name: 'Standard Day Pass',
    price: 35,
    description: 'Perfect for a single day adventure',
    features: ['Park Entry', 'Basic Interactive Map'],
    isPopular: false,
  },
  {
    id: 'discovery',
    name: 'Discovery Pro Pass',
    price: 55,
    description: 'The most popular choice',
    features: ['Standard Pass Features', 'AR Animal Tracking', 'Curated Audio Stories'],
    isPopular: true,
  },
  {
    id: 'researcher',
    name: 'Researcher Access',
    price: 95,
    description: 'For serious nature enthusiasts',
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
    // Navigate to checkout (placeholder for now)
    navigate('/checkout');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Detail Header */}
      <DetailHeader
        title="WRTI Wildlife Park"
        onBack={handleBack}
        showBackButton
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background">
        {/* Page Title Section */}
        <div className="px-4 sm:px-6 py-8 sm:py-12 max-w-2xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-3 leading-tight">
            Select Your Experience
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Choose the perfect pass for your ecological adventure.
          </p>
        </div>

        {/* Ticket Cards */}
        <div className="px-4 sm:px-6 pb-8 max-w-2xl mx-auto space-y-4">
          {TICKET_OPTIONS.map((ticket) => {
            const isSelected = selectedTicket === ticket.id;

            return (
              <div
                key={ticket.id}
                className={`relative transition-all duration-200 ${
                  isSelected ? 'scale-100' : 'scale-100'
                }`}
              >
                {/* Popular Badge */}
                {ticket.isPopular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center z-10">
                    <div className="bg-primary px-4 py-1 rounded-full">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  </div>
                )}

                {/* Ticket Card */}
                <Card
                  className={`overflow-hidden transition-all duration-200 ${
                    isSelected
                      ? 'border-2 border-primary bg-white shadow-lg'
                      : 'border border-border bg-white hover:shadow-md'
                  } ${ticket.isPopular ? 'pt-6' : ''}`}
                >
                  <div className="p-6 sm:p-8">
                    {/* Ticket Header */}
                    <div className="mb-4">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                        {ticket.name}
                      </h2>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-bold text-primary">
                          ${ticket.price}
                        </span>
                        <span className="text-sm text-muted-foreground">/person</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      {ticket.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm sm:text-base text-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Select Button */}
                    <button
                      onClick={() => handleSelectTicket(ticket.id)}
                      className={`w-full py-3 px-4 rounded-full font-semibold transition-all duration-200 text-base ${
                        isSelected
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'border-2 border-primary text-primary hover:bg-primary/5'
                      }`}
                    >
                      Select
                    </button>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="px-4 sm:px-6 py-8 max-w-2xl mx-auto">
          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-full"
          >
            Continue to Checkout
          </Button>
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
