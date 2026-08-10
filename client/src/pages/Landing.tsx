/**
 * Landing Page
 *
 * The WRTI Wildlife Park landing/home screen.
 * Implements the Stitch design with pixel-close fidelity.
 *
 * Design Reference: landing_page from Stitch export
 * Route: /
 */

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AppHeader } from '@/design-system/components/Headers';
import { BottomNavigation } from '@/design-system/components/BottomNavigation';
import { useLocation } from 'wouter';

export default function Landing() {
  const [, navigate] = useLocation();

  const handlePurchasePass = () => {
    navigate('/tickets');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  const handleExplorerNarratives = () => {
    navigate('/discovery');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* App Header */}
      <AppHeader title="WRTI Wildlife Park" />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background">
        {/* Hero Section */}
        <section
          className="relative w-full h-96 bg-cover bg-center flex items-end justify-center px-4 py-8"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop)',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

          {/* Hero Content Card */}
          <div className="relative z-10 w-full max-w-md bg-background/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 rounded-full mb-4">
              <div className="w-2 h-2 bg-accent rounded-full" />
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                Premium Conservation Tourism
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3 leading-tight">
              Your Journey into the <span className="text-primary">Wild</span> Begins Here.
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              Immerse yourself in a meticulously curated natural sanctuary. Experience the delicate balance of ecology through our advanced interactive pathways and expert-led expeditions.
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handlePurchasePass}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-full"
              >
                Purchase Pass →
              </Button>
              <Button
                onClick={handleLearnMore}
                variant="outline"
                className="w-full border-border text-foreground hover:bg-muted py-3 rounded-full"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Discover the Reserve Section */}
        <section className="px-4 py-8 sm:px-6 sm:py-12 max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Discover the Reserve
            </h2>
            <p className="text-sm text-muted-foreground">
              Three pillars of our ecological stewardship program.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="space-y-6">
            {/* Botanical Discovery Card */}
            <Card className="overflow-hidden border-border">
              <div className="relative h-48 bg-cover bg-center">
                <img
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=300&fit=crop"
                  alt="Botanical Discovery"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Card Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    Flora
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    Archive
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Botanical Discovery
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Access our living library. Scan over 10,000 documented species and learn about their role in the micro-ecosystem.
                </p>
              </div>
            </Card>

            {/* Interactive Map Card */}
            <Card className="overflow-hidden border-border">
              <div className="relative h-48 bg-muted flex items-center justify-center">
                {/* Placeholder for map visualization */}
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Interactive Map Preview</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">📍</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Interactive Map
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Navigate the reserve with precision. Real-time atmospheric data and dynamic trail routing at your fingertips.
                </p>
              </div>
            </Card>

            {/* Expert Storytelling Card */}
            <Card className="overflow-hidden border-border">
              <div className="relative h-48 bg-cover bg-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop"
                  alt="Expert Storytelling"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded">
                    🎧 AUDIO GUIDE
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Expert Storytelling
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Don't just observe; understand. Unlock location-aware audio narratives narrated by leading botanists and conservationists as you move through the park's distinct biomes.
                </p>
              </div>
            </Card>

            {/* Explorer Narratives CTA */}
            <div className="text-center pt-4">
              <Button
                onClick={handleExplorerNarratives}
                variant="link"
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Explorer Narratives →
              </Button>
            </div>
          </div>
        </section>

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
        activeId="discovery"
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
