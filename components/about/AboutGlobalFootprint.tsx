"use client";

import Image from "next/image";
import { ASSETS } from "@/lib/assets";

/** Same “Global Stats & Footprint” block as `frontend/src/pages/about/About.jsx`. */
const LOCATIONS = [
  {
    country: "USA",
    address: "9854 National Blvd #1042, Los Angeles, CA 90034",
    flag: ASSETS.flags.usa,
  },
  {
    country: "UK",
    address: "275 New North Road, Islington, Suite 1946, London",
    flag: ASSETS.flags.uk,
  },
  {
    country: "Canada",
    address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2",
    flag: ASSETS.flags.canada,
  },
  {
    country: "Australia",
    address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2",
    flag: ASSETS.flags.australia,
  },
  {
    country: "UAE",
    address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2",
    flag: ASSETS.flags.uae,
  },
  {
    country: "China",
    address: "7398 Yonge St #6d, Thornhill, ON L4J 8J2",
    flag: ASSETS.flags.china,
  },
] as const;

export default function AboutGlobalFootprint() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white">
      <div className="max-w-8xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-8 rounded-3xl text-white shadow-xl">
              <h3 className="text-6xl font-bold text-red-500 mb-2 tracking-tighter">5+</h3>
              <p className="text-slate-300 text-sm font-bold uppercase tracking-widest leading-tight">
                Global Headquarters
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-6xl font-bold text-slate-800 mb-2 tracking-tighter">1k+</h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">
                Satisfied Brand Partners
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-red-500 font-black text-xs uppercase tracking-widest">
              Our Global Footprint
            </h2>
            <h3 className="text-slate-800 text-4xl lg:text-5xl  font-bold leading-tight tracking-tight">
              Operating at the speed of{" "}
              <span className="text-red-500">International Commerce.</span>
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.country}
              className="group p-8 bg-white rounded-3xl border border-slate-100 hover:border-red-500/20 hover:bg-slate-50/50 transition-all duration-300"
            >
              <div className="mb-4 flex justify-start items-start transition-all">
                <Image
                  src={loc.flag}
                  alt={`${loc.country} flag`}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              </div>
              <h4 className="text-2xl font-bold mb-3">{loc.country}</h4>
              <p className="text-slate-500 text-base leading-relaxed mb-6">{loc.address}</p>
              <div className="w-10 h-1 bg-slate-200 group-hover:w-full group-hover:bg-red-500 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
