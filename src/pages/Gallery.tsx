import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';

const images = Array.from({ length: 12 }, (_, i) => `/gallery/${i + 1}.webp`);

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => {
    setSelectedIdx(idx);
    setOpen(true);
  };

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-100 mb-2">Gallery</h1>
          <p className="text-purple-300 mb-6">Showcase of your generated 3D renders and creative assets.</p>
        </div>
        {/* Masonry grid using CSS columns */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {images.map((src, idx) => (
            <Card
              key={src}
              className="mb-6 break-inside-avoid overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105 border-2 border-purple-700/30 bg-slate-900/80"
              onClick={() => handleOpen(idx)}
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-72 sm:h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-110 rounded-lg"
                loading="lazy"
              />
            </Card>
          ))}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none flex flex-col items-center justify-center">
            {selectedIdx !== null && (
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <Button variant="ghost" size="icon" onClick={handlePrev} aria-label="Previous image">
                    &#8592;
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleNext} aria-label="Next image">
                    &#8594;
                  </Button>
                </div>
                <img
                  src={images[selectedIdx]}
                  alt="Selected gallery image"
                  className="max-h-[80vh] max-w-full rounded-lg shadow-2xl"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 