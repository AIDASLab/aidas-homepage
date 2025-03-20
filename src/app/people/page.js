"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/layout";

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
        "Undergraduate Interns": people.filter(p => p.role === "UG"),
        "Administrative Staff": people.filter(p => p.role === "Staff"),
    };

    return (
        <Layout>
            <img 
            src="/background/people.jpg" 
            alt="Decoration"
            className="absolute top-0 left-0 w-full h-32 sm:h-48 md:h-56 lg:h-[25vh] object-cover"
            />


            <div className="relative container mx-auto p-8 pt-40 sm:pt-60 md:pt-80 lg:pt-[25vh]">
                <h1 className="text-4xl text-center font-bold mb-6">People</h1>
                <h2 className="text-3xl font-semibold mt-6 mb-6">Principal Investigator</h2>

                {/* Principal Investigator Section */}
                {professor && (
                    <section className="w-full flex flex-col md:flex-row items-center justify-center bg-gray-100 py-16 px-8 rounded-lg shadow-md mb-10">
                        {/* Left Side - Large Image */}
                        <div className="w-full md:w-1/3 flex justify-center">
                            <img
                                src={professor.image}
                                alt={professor.name}
                                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg"
                            />
                        </div>

                        {/* Right Side - Career Information */}
                        <div className="w-full md:w-2/3 mt-6 md:mt-0 md:ml-12">
                            <h2 className="text-3xl font-bold mb-2">{professor.name}</h2>
                            <p className="text-xl font-semibold text-gray-700 mb-4">{professor.role}</p>
                            <h3 className="text-2xl font-bold mb-2">Education</h3>
                            <ul className="text-gray-600 list-disc list-inside">
                                {professor.education?.map((edu, index) => (
                                    <li key={index}>{edu}</li>
                                ))}
                            </ul>
                            <h3 className="text-2xl font-bold mt-6 mb-2">Experience</h3>
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
                    <div key={section} className="mb-10">
                        {/* Divider (skip for the first section) */}
                        {index !== 0 && <hr className="border-t border-gray-300 my-8" />}

                        {/* Section Title */}
                        <h2 className="text-3xl font-semibold mb-8">{section}</h2>

                        {/* List of people */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {members.map((person, idx) => (
                                <div key={idx} className="p-6 border border-gray-200 rounded-xl shadow-lg bg-#f0f0f0 hover:shadow-xl transition-shadow duration-300">
                                <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto rounded-full mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-center">{person.name}</h3>
                                    <h4 className="text-l text-left font-semibold ml-6 mt-2">Research Areas</h4>
                                    <div className="text-gray-600 text-left ml-6 mt-2">
                                        {person.research?.map((res, index) => (
                                            <p key={index}>{res}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}
