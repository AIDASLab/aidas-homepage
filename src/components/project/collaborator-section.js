'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CollaboratorSection({ src = [] }) {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/json/collaborator.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((org) => src.includes(org.name));
        setCompanies(filtered);
      })
      .catch((err) => console.error("Failed to load collaborators:", err));
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 mb-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl text-[#666666] mb-10">Collaborating organizations</h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 items-center justify-center">
          {companies.map((org, idx) => (
            <Link
              key={idx}
              href={org.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center space-y-2"
            >
              {/* Fixed-size container */}
              <div className="w-30 h-30 flex items-center justify-center">
                <Image
                  src={`/${org.image}`}
                  alt={org.name}
                  width={100}
                  height={100}
                  className="object-contain max-h-full max-w-full"
                />
              </div>
              <span className="text-sm text-[#333333]">{org.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
