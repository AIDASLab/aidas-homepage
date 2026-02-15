"use client";

import PageLayout from "@/components/layout/page-layout";

export default function Contact() {
    return (

        <PageLayout title="Contact">
            {/* Google Maps Embed */}
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative aspect-[4/3] sm:aspect-[16/9] rounded-lg overflow-hidden">
                        <iframe
                        className="w-full h-full border-0"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6334.92149112827!2d126.952488!3d37.449842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6119a3f0e86f%3A0x91c09da196d7e734!2sSNU%20Bldg%20%23301%3A%20the%20First%20Engineering%20Hall!5e0!3m2!1sen!2skr!4v1742045278867!5m2!1sen!2skr"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Details */}
                <div className="w-full p-5 mt-6 text-center">
                    <h2 className="text-2xl font-semibold mb-3">Address</h2>
                    <p>1, Gwanak-ro, Gwanak-gu (building #301, office #808), Seoul, Republic of Korea, 08826</p>

                    <h2 className="text-2xl font-semibold  mt-7 mb-3">Contact Information</h2>
                    <p>Email: jaeyoung.do at snu.ac.kr</p>
                </div>

        </PageLayout>
    );
}
