import fs from 'fs/promises';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

// this code is designed differently compared to collabrator section
// because this section is supposed to be executed in [category]/[slug]
// and routed via dynamic routing 
// so if we load the json file using fetch, it causes error 

export default async function ProjectCollaborator({ src }) {
    const jsonPath = path.join(process.cwd(), 'public', 'json', 'collaborator.json');
    let companies = [];
  
    try {
      const raw = await fs.readFile(jsonPath, 'utf-8');
      const allCompanies = JSON.parse(raw);
  
      companies = allCompanies.filter((org) => src.includes(org.name));
    } catch (e) {
      console.error('Failed to load or filter collaborators.json:', e);
    }
  
    if (!Array.isArray(companies) || companies.length === 0) return null;
  
    return (
      <section className="w-full mt-14 px-4 sm:px-6 lg:px-16 mb-14">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl text-muted mb-7">
            Collaborating organizations
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5 items-center justify-center">
            {companies.map((org, idx) => (
              <Link
                key={idx}
                href={org.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center space-y-2"
              >
                <div className="w-24 h-16 flex items-center justify-center">
                  <Image
                    src={`/${org.image}`}
                    alt={org.name}
                    width={100}
                    height={100}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <span className="text-sm text-[#4b5563]">{org.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }
