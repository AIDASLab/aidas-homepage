"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/layout/page-layout";
import PeopleInfoSection from "@/components/people/people-info-section";
import SocialIcon from "@/components/common/social-icon";

const ROLE_SECTIONS = [
  { label: "Ph.D. Students", role: "PhD" },
  { label: "M.S./Ph.D. Students", role: "MP" },
  { label: "M.S. Students", role: "MS" },
  { label: "Interns", role: "UG" },
  { label: "Administrative Staff", role: "Staff" },
];

export default function People() {
  const [professor, setProfessor] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/json/professor.json").then((res) => res.json()),
      fetch("/json/people.json").then((res) => res.json()),
    ])
      .then(([professorData, peopleData]) => {
        setProfessor(professorData);
        setPeople(peopleData);
      })
      .catch((err) => console.error("Error loading people page data:", err));
  }, []);

  const groupedPeople = useMemo(() => {
    return ROLE_SECTIONS.map(({ label, role }) => ({
      section: label,
      members: people.filter((person) => person.role === role),
    })).filter((group) => group.members.length > 0);
  }, [people]);

  return (
    <PageLayout title="People">
      <section className="page-section space-y-8">
        {professor && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">Principal Investigator</h2>
              <span className="h-px flex-1 bg-slate-200" />
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">1</span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[240px_1fr] md:gap-8">
              <div className="flex flex-col items-center">
                <Image
                  src={professor.image}
                  alt={professor.name}
                  width={240}
                  height={240}
                  className="h-48 w-36 rounded-2xl object-cover ring-1 ring-slate-200 sm:h-52 sm:w-40 md:h-60 md:w-44"
                />
                <div className="mt-4 flex w-36 items-center justify-center gap-4 text-slate-600 sm:w-40 md:w-44">
                  <SocialIcon property="homepage" href={professor.homepage} />
                  <SocialIcon property="email" href={professor.email} />
                  <SocialIcon property="linkedin" href={professor.linkedin} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold leading-tight text-slate-800">{professor.name}</h3>
                <p className="mt-1 text-base font-semibold text-slate-500">{professor.role}</p>

                {Array.isArray(professor.education) && professor.education.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Education</h4>
                    <ul className="mt-1.5 space-y-1 text-sm leading-snug text-slate-700">
                      {professor.education.map((edu, idx) => (
                        <li key={idx}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(professor.experience) && professor.experience.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Experience</h4>
                    <ul className="mt-1.5 space-y-1 text-sm leading-snug text-slate-700">
                      {professor.experience.map((exp, idx) => (
                        <li key={idx}>{exp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            </div>
          </section>
        )}

        <div className="space-y-8">
          {groupedPeople.map(({ section, members }, sectionIdx) => (
            <section key={section} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">{section}</h2>
                <span className="h-px flex-1 bg-slate-200" />
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {members.length}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {members.map((person, idx) => (
                  <article key={`${person.name}-${idx}`} className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex flex-col items-center sm:items-start">
                        <Image
                          src={person.image}
                          alt={person.name}
                          width={128}
                          height={128}
                          className="h-32 w-24 rounded-xl object-cover ring-1 ring-slate-200 sm:h-36 sm:w-28"
                          priority
                        />
                        <div className="mt-3 flex w-24 items-center justify-center gap-3 text-slate-600 sm:w-28">
                          <SocialIcon property="homepage" href={person.homepage} />
                          <SocialIcon property="email" href={person.email} />
                          <SocialIcon property="linkedin" href={person.linkedin} />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold leading-tight text-slate-800">{person.name}</h3>

                        <PeopleInfoSection person={person} property="research" title="Research Areas" />
                        <PeopleInfoSection person={person} property="education" title="Education" />
                        <PeopleInfoSection person={person} property="experience" title="Experience" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
