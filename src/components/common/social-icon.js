'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// FontAwesome icon classes
const ICON_CLASS = {
  email:       'fas fa-envelope fa-md',
  homepage:    'fas fa-home fa-md',
  linkedin:    'fab fa-linkedin fa-md',
  github:      'fab fa-github fa-md',
  huggingface: 'fab fa-hugging-face fa-md',
  youtube:     'fab fa-youtube fa-md',
};

export default function SocialIcon({ property, href }) {
  // don't render if no href or unknown property
  if (!href || !ICON_CLASS[property]) return null;

  // for email, prefix mailto:
  const url = property === 'email' ? `mailto:${href}` : href;

  return (
    <Link
      href={url}
      aria-label={property}
      target={property === 'email' ? undefined : '_blank'}
      rel={property === 'email' ? undefined : 'noopener noreferrer'}
    >
      {property === 'huggingface' ? ( // FontAwesome do not support huggingface icon yet 
        <Image
          src="/logo/huggingface.svg"
          alt="Hugging Face"
          width={20}
          height={20}
          className="h-5 w-5 inline"
        />
      ) : ICON_CLASS[property] ? (
        <i className={ICON_CLASS[property]} />
      ) : null}
    </Link>
  );
}