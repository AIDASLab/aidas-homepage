"use client";

import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";

export default function Contact() {
  return (
    <PageLayout title="Contact">
      <section className="page-section space-y-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative aspect-[4/3] sm:aspect-[16/10]">
              <iframe
                className="h-full w-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6334.92149112827!2d126.952488!3d37.449842!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b6119a3f0e86f%3A0x91c09da196d7e734!2sSNU%20Bldg%20%23301%3A%20the%20First%20Engineering%20Hall!5e0!3m2!1sen!2skr!4v1742045278867!5m2!1sen!2skr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AIDAS Lab location map"
              />
            </div>
          </div>

          <aside className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Address</p>
                <p className="mt-1 text-sm leading-snug text-slate-700">
                  1, Gwanak-ro, Gwanak-gu
                  <br />
                  Building #301, Office #808
                  <br />
                  Seoul 08826, Republic of Korea
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Email</p>
                <p className="mt-1 text-sm leading-snug text-slate-700">jaeyoung.do@snu.ac.kr</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="mailto:jaeyoung.do@snu.ac.kr"
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                >
                  Send Email
                </Link>
                <Link
                  href="https://maps.google.com/?q=SNU%20Bldg%20%23301%20the%20First%20Engineering%20Hall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-900"
                >
                  Open in Maps
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageLayout>
  );
}
