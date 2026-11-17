import React from 'react';
import { WifiOff, MapPin, Share2, Users } from 'lucide-react';

export default function FeatureHighlights() {
  const highlights = [
    {
      icon: WifiOff,
      title: 'Works Offline',
      description: 'Communicates without internet or mobile network',
    },
    {
      icon: MapPin,
      title: 'Share Location',
      description: 'Send real-time GPS coordinates',
    },
    {
      icon: Share2,
      title: 'Mesh Communication',
      description: 'Multi-hop LoRa based communication',
    },
    {
      icon: Users,
      title: 'Faster Rescue',
      description: 'Helps responders reach affected people quickly',
    },
  ];

  return (
    <section className="relative z-10 -mt-4 mb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {highlights.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="card-clean card-clean-hover rounded-2xl p-5 sm:p-6 flex items-start space-x-4 border border-surface-border"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-resqblue-subtle/80 text-resqblue flex items-center justify-center border border-resqblue/20">
                <IconComponent className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-extrabold text-navy tracking-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-resqtext-secondary leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

