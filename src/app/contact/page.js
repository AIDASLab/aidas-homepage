"use client";

import PageLayout from "@/components/layout/page-layout";

export default function Contact() {
    return (

        <PageLayout title="Contact">
            {/* Google Maps Embed */}
                    <iframe
                        className="w-full h-full"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6334.92149112827!2d126.952488!3d37.449842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6119a3f0e86f%3A0x91c09da196d7e734!2sSNU%20Bldg%20%23301%3A%20the%20First%20Engineering%20Hall!5e0!3m2!1sen!2skr!4v1742045278867!5m2!1sen!2skr"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                {/* Contact Details */}
                <div className="w-full p-6 mt-8 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Address</h2>
                    <p>1, Gwanak-ro, Gwanak-gu (building #301, office #808), Seoul, Republic of Korea, 08826</p>

                    <h2 className="text-2xl font-semibold  mt-10 mb-4">Contact Information</h2>
                    <p>Email: jaeyoung.do at snu.ac.kr</p>
                </div>

        </PageLayout>
    );
}
