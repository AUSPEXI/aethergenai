import React from 'react';

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
};

const defaultItems: MediaItem[] = [
  { type: 'image', src: '/og-image.svg', alt: 'AethergenAI OG Image', caption: 'AethergenAI overview' },
  { type: 'image', src: '/auspexi.svg', alt: 'Auspexi logo', caption: 'Auspexi brand' },
];

const MediaGallery: React.FC<{ items?: MediaItem[] }> = ({ items = defaultItems }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Media Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((m, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
            {m.type === 'image' ? (
              <img src={m.src} alt={m.alt || ''} className="w-full h-48 object-contain bg-white" />
            ) : (
              <video controls className="w-full h-48 bg-black">
                <source src={m.src} />
              </video>
            )}
            {m.caption && (
              <div className="p-3 text-sm text-white/80">{m.caption}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;



