"use client";

import Layout from "../../../components/layout";
import Image from "next/image";

export default function Join() {
  return (
    <Layout>
      <section className="w-full pt-24 pb-24 px-4 sm:px-8 lg:px-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-24 text-primary">Join</h1>

        {/* Highlighted Section */}
        <div className="bg-[#eef3f9] px-6 py-14 md:px-16 md:py-20 lg:px-24 flex flex-col md:flex-row gap-12 lg:gap-20 items-center rounded-xl shadow-sm">
          {/* Left: Text */}
          <div className="md:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-primary">
              Innovating the future of AI
            </h2>
            <p className="text-lg sm:text-xl lg:text-xl text-point leading-relaxed">
              From advanced Generative AI models to AI-powered novel system architectures and healthcare breakthroughs
            </p>
          </div>

          {/* Right: Image */}
          <div className="md:w-1/2 relative h-64 sm:h-80 md:h-96 w-full rounded-lg overflow-hidden">
            <Image
              src="/background/snu-night.jpg"
              alt="SNU Night"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Application Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24 max-w-7xl mx-auto px-2 sm:px-4 text-primary">
          <p className="text-lg sm:text-xl lg:text-xl leading-relaxed">
            The AIDAS Lab is actively recruiting{" "}
            <span className="font-semibold">
              highly motivated undergraduate students, graduate students, and postdoctoral researchers
            </span>{" "}
            who are passionate about tackling challenging problems in the fields of CoreAI, SysAI, and MedAI.
            Interested applicants should send an email to Prof. Do, briefly describing their background, research interests,
            and relevant experience.
          </p>
          <p className="text-lg sm:text-xl lg:text-xl leading-relaxed">
            Please ensure to include{" "}
            <span className="font-semibold">
              your CV, academic transcripts, and any other supporting documents
            </span>{" "}
            in the email. Applicants to the graduate program must contact Prof. Do before submitting their official application
            to SNU. Due to a high volume of applications, please allow several days for a response. Thank you for your understanding!
          </p>
        </div>
      </section>
    </Layout>
  );
}
