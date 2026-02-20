'use client';

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

const ICON_LABEL = {
  email: 'Email',
  homepage: 'Homepage',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  huggingface: 'Hugging Face',
  youtube: 'YouTube',
};

export default function SocialIcon({ property, href }) {
  // don't render if no href or unknown property
  if (!href || !ICON_CLASS[property]) return null;

  // for email, prefix mailto:
  const url = property === 'email' ? `mailto:${href}` : href;

  return (
    <Link
      href={url}
      aria-label={ICON_LABEL[property] || property}
      title={ICON_LABEL[property] || property}
      target={property === 'email' ? undefined : '_blank'}
      rel={property === 'email' ? undefined : 'noopener noreferrer'}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-1"
    >
      {property === 'huggingface' ? ( // FontAwesome do not support huggingface icon yet 
        <Image
          src="/logo/huggingface.svg"
          alt="Hugging Face"
          width={20}
          height={20}
          className="h-4 w-4 inline"
        />
      ) : ICON_CLASS[property] ? (
        <i className={ICON_CLASS[property]} />
      ) : null}
    </Link>
  );
}
