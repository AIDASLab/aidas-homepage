'use client';

import React from 'react';
import Link from 'next/link';

// FontAwesome icon classes
const ICON_CLASS = {
  email:    'fas fa-envelope fa-md',
  homepage: 'fas fa-home fa-md',
  linkedin: 'fab fa-linkedin fa-md',
};

export default function PeopleSocialIcon({ property, href }) {
  // don't render if no href or unknown property
  if (!href || !ICON_CLASS[property]) return null;

  // for email, prefix mailto:
  const url = property === 'email' ? `mailto:${href}` : href;

  return (
    <Link
      href={url}
      className="hover:text-gray-800"
      aria-label={property}
      target={property === 'email' ? undefined : '_blank'}
      rel={property === 'email' ? undefined : 'noopener noreferrer'}
    >
      <i className={ICON_CLASS[property]} />
    </Link>
  );
}
