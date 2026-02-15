"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/layout/page-layout";
import PeopleInfoSection from "@/components/people/people-info-section";
import SocialIcon from "@/components/common/social-icon";

export default function People() {
    const [professor, setProfessor] = useState(null);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch("/json/professor.json")
            .then((res) => res.json())
            .then((data) => setProfessor(data))
            .catch((err) => console.error("Error loading professor:", err));
    }, []);

    useEffect(() => {
        fetch("/json/people.json")
            .then((res) => res.json())
            .then((data) => setPeople(data))
            .catch((err) => console.error("Error loading people:", err));
    }, []);

    // Group people by role
    const groupedPeople = {
        "Ph.D. Students": people.filter(p => p.role === "PhD"),
        "M.S./Ph.D. Students": people.filter(p => p.role === "MP"),
        "M.S. Students": people.filter(p => p.role === "MS"),
        "Interns": people.filter(p => p.role === "UG"),
        "Administrative Staff": people.filter(p => p.role === "Staff"),
    };

    return (
        <PageLayout title="People">
            <h2 className="text-3xl font-semibold mt-3 mb-4">Principal Investigator</h2>

            {/* Principal Investigator Section */}
            {professor && (
                <section className="w-full flex flex-col md:flex-row items-center justify-center py-10 px-6 rounded-lg mb-8">
                    {/* Left Side - Large Image */}
                    <div className="w-full md:w-1/3 flex-col items-center">
                        <Image
                            src={professor.image}
                            alt={professor.name}
                            width={256}
                            height={256}
                            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto"
                        />

                        {/* Social Icons */}
                        <div className="flex w-48 md:w-64 justify-center space-x-6 mt-7 text-gray-600 hover:text-gray-800 mx-auto">
                            <SocialIcon property="homepage" href={professor.homepage} />
                            <SocialIcon property="email"    href={professor.email} />
                            <SocialIcon property="linkedin" href={professor.linkedin} />
                        </div>
                    </div>

                    {/* Right Side - Career Information */}
                    <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-10">
                        <h2 className="text-3xl font-bold mb-2">{professor.name}</h2>
                        <p className="text-xl font-semibold text-muted mb-3">{professor.role}</p>
                        <h3 className="text-2xl font-bold mb-1.5">Education</h3>
                        <ul className="text-gray-600 list-disc list-inside">
                            {professor.education?.map((edu, index) => (
                                <li key={index}>{edu}</li>
                            ))}
                        </ul>
                        <h3 className="text-2xl font-bold mt-4 mb-1.5">Experience</h3>
                        <ul className="text-gray-600 list-disc list-inside">
                            {professor.experience?.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* Other People (Grouped by Role) */}
            {Object.entries(groupedPeople).map(([section, members], index) => (
                <div key={section} className="mb-8">
                
                    {/* Divider (skip for the first section) */}
                    {index !== 0 && <hr className="border-t border-gray-300 my-6" />}

                    {/* Section Title */}
                    <h2 className="text-3xl font-semibold mb-6">{section}</h2>

                    {/* List of people */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
                        {members.map((person, idx) => (
                            <div key={idx} className="p-5 rounded-xl bg-#f0f0f0 duration-300">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    width={112} // Controls the base width (28 * 4)
                                    height={112} // Controls the base height (28 * 4)
                                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto rounded-full object-cover"
                                    priority
                                />
                                <h3 className="text-2xl font-semibold text-center pt-4">{person.name}</h3>
                                
                                <div className="flex justify-center space-x-6 mt-3 text-gray-600 hover:text-gray-800">
                                    <SocialIcon property="homepage" href={person.homepage} />
                                    <SocialIcon property="email"    href={person.email} />
                                    <SocialIcon property="linkedin" href={person.linkedin} />
                                </div>

                                <>
                                    <PeopleInfoSection 
                                        person={person}
                                        property="research"
                                        title="Research Areas"
                                    /> 
                                    <PeopleInfoSection 
                                        person={person}
                                        property="education"
                                        title="Education"
                                    /> 
                                    <PeopleInfoSection 
                                        person={person}
                                        property="experience"
                                        title="Experience"
                                    /> 
                                </>

                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </PageLayout>
    );
}
