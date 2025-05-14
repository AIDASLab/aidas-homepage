'use client';

import React from 'react';
import Image from 'next/image';

export default function ProjectThumbnail({ src, alt = 'Project Thumbnail' }) {
  if (!src) return null;

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-[700px] relative aspect-[7/4]">
        <Image
          src={`/${src}`}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
        />
      </div>
    </div>
  );
}
  