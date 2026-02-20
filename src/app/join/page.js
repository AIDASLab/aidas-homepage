"use client";

import PageLayout from "@/components/layout/page-layout";
import Image from "next/image";

export default function Join() {
  return (

    <PageLayout title="Join">

      <section>
        {/* Highlighted Section */}
        <div className="bg-[#eef3f9] px-6 py-10 md:px-14 md:py-12 lg:px-20 flex flex-col md:flex-row gap-8 lg:gap-12 items-center rounded-xl">
          {/* Left: Text */}
          <div className="md:w-1/2">
            <h2 className="text-l sm:text-xl lg:text-2xl font-semibold mb-4 text-primary">
              Innovating the future of AI
            </h2>
            <p className="text-lg sm:text-lg lg:text-l text-point leading-snug">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14 max-w-7xl mx-auto px-2 sm:px-4 text-primary">
          <p className="text-lg sm:text-l lg:text-l leading-snug">
            The AIDAS Lab is actively recruiting{" "}
            <span className="font-semibold">
              highly motivated undergraduate students, graduate students, and postdoctoral researchers
            </span>{" "}
            who are passionate about tackling challenging problems in the fields of CoreAI, SysAI, and MedAI.
            Interested applicants should send an email to Prof. Do, briefly describing their background, research interests,
            and relevant experience.
          </p>
          <p className="text-lg sm:text-l lg:text-l leading-snug">
            Please ensure to include{" "}
            <span className="font-semibold">
              your CV, academic transcripts, and any other supporting documents
            </span>{" "}
            in the email. Applicants to the graduate program must contact Prof. Do before submitting their official application
            to SNU. Due to a high volume of applications, please allow several days for a response. Thank you for your understanding!
          </p>
        </div>
      </section>
      
    </PageLayout>
  );
}
