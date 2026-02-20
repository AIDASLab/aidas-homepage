'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    '/hero/img1.jpg',
    '/hero/2025teachers_day.jpeg'
  ];

export default function HeroSection() {
    const [index, setIndex] = useState(0);
  
    // auto-advance
    const interval = 10000 // 10 seconds
    useEffect(() => {
      const t = setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, interval );
      return () => clearInterval(t);
    }, []);

    return (
        <section className="relative w-screen h-[56vh] min-h-[420px] mt-10 sm:mt-14 md:mt-16 overflow-hidden">
          {/* slide-wrapper: width = N * 100vw, translateX moves exactly one viewport each time */}
          <div
            className="flex h-full transition-transform duration-1000 ease-in-out"
            style={{
              width: `${images.length * 100}vw`,
              transform: `translateX(-${index * 100}vw)`,
            }}
          >
            {images.map((src, i) => (
              <div key={src} className="relative w-screen h-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Slide ${i}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/45 to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-5 pb-10 sm:px-8 sm:pb-12 lg:px-14 lg:pb-14">
              <div className="max-w-3xl text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">AIDAS LAB</p>
                <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                  Advancing Reliable AI
                  <br />
                  for Real-World Impact
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-snug text-slate-200 sm:text-base">
                  We study fundamental model architectures, data-intensive systems, and embodied agents through an integrated approach that connects AI design, system optimization, and practical impact.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href="/publications"
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                  >
                    Explore Publications
                  </Link>
                  <Link
                    href="/seminar"
                    className="rounded-full border border-white/70 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Explore Seminars
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
