"use client";

import Layout from "../../../components/layout";

export default function Join() {
    return (
        <Layout>
            {/* Background Decoration */}
            <img 
                src="/background/landscape.jpg" 
                alt="Decoration"
                className="absolute top-0 left-0 w-full h-32 sm:h-48 md:h-56 lg:h-[25vh] object-cover"
            />

            {/* Join Page Container */}
            <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-40 sm:pt-60 md:pt-80 lg:pt-[25vh]">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Join Our Lab</h1>

                {/* Join Information Section */}
                <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are Looking For</h2>
                    <p className="text-gray-600 leading-relaxed">
                    The AIDAS Lab is actively recruiting highly motivated undergraduate students, graduate students, and postdoctoral researchers who are passionate about tackling challenging problems in the fields of CoreAI, SysAI, and MedAI. Interested applicants should send an email to Prof. Do, briefly describing their background, research interests, and relevant experience.
                    <br></br><br></br>
                    Please ensure to include your CV, academic transcripts, and any other supporting documents in the email. Applicants to the graduate program must contact Prof. Do before submitting their official application to SNU. Due to a high volume of applications, please allow several days for a response. Thank you for your understanding!
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Application Process</h2>
                    <p className="text-gray-600 leading-relaxed">
                        The application process varies depending on the program you are applying for. 
                        We typically accept applications for:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>Undergraduate Research Internships</li>
                        <li>Master’s and Ph.D. Positions</li>
                        <li>Postdoctoral Research Positions</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">How to Apply</h2>
                    <p className="text-gray-600 leading-relaxed">
                        To apply, please send an email to <span className="text-blue-600 font-semibold">contact@aidas.snu.ac.kr</span> 
                        with the following information:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                        <li>CV (Curriculum Vitae)</li>
                        <li>Research Interests</li>
                        <li>Past Projects & Publications (if applicable)</li>
                        <li>Preferred Research Topic</li>
                    </ul>

                </div>
            </div>
        </Layout>
    );
}
