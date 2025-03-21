"use client";

import Layout from "../../../components/layout";

export default function Contact() {
    return (
        <Layout>
            {/* Background Decoration */}

            {/* Contact Page Container */}
            <div className="relative flex flex-col items-center justify-center min-h-screen p-8 pt-20 sm:pt-40 md:pt-60 lg:pt-[15vh]">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact</h1>

                {/* Google Maps Embed */}
                <div className="w-full max-w-4xl h-64 sm:h-80 md:h-96">
                    <iframe
                        className="w-full h-full border rounded-lg shadow-lg"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6334.92149112827!2d126.952488!3d37.449842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6119a3f0e86f%3A0x91c09da196d7e734!2sSNU%20Bldg%20%23301%3A%20the%20First%20Engineering%20Hall!5e0!3m2!1sen!2skr!4v1742045278867!5m2!1sen!2skr"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
                {/* Contact Details */}
                <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-8 text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
                    <p className="text-gray-600">1, Gwanak-ro, Gwanak-gu (building #301, office #808), Seoul, Republic of Korea, 08826</p>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact Information</h2>
                    <p className="text-gray-600">Email: jaeyoung.do at snu.ac.kr</p>
                    <p className="text-gray-600">Phone: +82)10-1234-5678</p>
                </div>
            </div>
        </Layout>
    );
}
