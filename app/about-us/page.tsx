import {
  Heart,
  Zap,
  TrendingUp,
  Users,
  Shield,
  BadgeCheck,
  UtensilsCrossed,
  ShoppingBag,
  Truck,
  Home,
  Quote,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Fraunces } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/reveal";
import SectionNav from "@/components/section-nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "About Us — Dinebd",
  description: "Delivering convenience, quality, and reliability since 2020",
};

const services = [
  { icon: UtensilsCrossed, label: "Book a Table" },
  { icon: ShoppingBag, label: "Takeaway" },
  { icon: Truck, label: "Food Delivery" },
  { icon: Users, label: "Catering" },
  { icon: Home, label: "Homemade" },
];

const stakeholders = [
  {
    label: "Our Riders",
    body: "Not “just delivery men.” They work with dignity and represent our platform every day. Safety, professionalism, and mutual respect are the standard — always.",
    image: "/for_journal/rider_food.jpg",
  },
  {
    label: "Our Partner Kitchens",
    body: "Not “just vendors.” They are small businesses, family-run operations, and hardworking people building a better future through good food. We protect their effort and reputation.",
    image: "/for_journal/home_cook.jpg",
  },
  {
    label: "Our Customers",
    body: "Not “orders.” Families, students, offices, and everyday people who want their food to arrive clean, on time, and exactly as promised. That trust is never taken lightly.",
    image: "/for_journal/top_resturant.jpg",
  },
];

const beliefs = [
  "Good food starts with clean kitchens",
  "Honest work deserves clear rules",
  "Respect goes both ways",
  "Local businesses should grow, not get squeezed",
];

// Same source copy as before, only split into title/body pairs at its
// natural sentence boundaries so it renders as a readable list instead of
// one unbroken paragraph. No words added, removed, or reordered.
const valuePillars = [
  {
    title: "We Respect Food",
    body: "Food is not “just a product.” It carries someone’s name, effort, and pride. We care about hygiene, handling, and quality because once trust is broken, it’s gone. We protect food from kitchen to doorstep.",
  },
  {
    title: "We Respect People",
    body: "Customers, riders, restaurants. Everyone matters. Behind every order is a real person. A rider earning with dignity. A small kitchen taking a risk. A customer trusting us with their meal. We speak clearly, act fairly, and expect respect in return. That trust is never taken lightly, and we work to earn it every single day.",
  },
  {
    title: "We Do Things Properly",
    body: "Rules are not there to control people. They are there to protect everyone. We set clear standards and we follow them. Even when it’s harder. Especially when it’s harder.",
  },
  {
    title: "We Are Accountable",
    body: "If we make a mistake, we own it. No hiding. No blaming. We fix problems, learn, and move forward.",
  },
  {
    title: "We Support Local",
    body: "We grow with local restaurants, home chefs, and communities. When they grow, we grow. When they struggle, we don’t look away.",
  },
];

const values = [
  {
    icon: Users,
    title: "Customer First",
    desc: "Every feature is built to make the experience smoother and more delightful for our users.",
  },
  {
    icon: BadgeCheck,
    title: "Quality & Trust",
    desc: "Only verified restaurants and genuine reviews to ensure you always get the best.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "Constantly improving our technology and service to stay ahead of what you need.",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "Empowering local restaurants, home chefs, and riders to grow their businesses.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    desc: "Creating real opportunities for our partners, riders, and team to thrive.",
  },
  {
    icon: Shield,
    title: "Reliability",
    desc: "Consistent, on-time delivery and service you can depend on every single time.",
  },
];

const navItems = [
  { id: "our-story", label: "Our Story" },
  { id: "our-people", label: "Our People" },
  { id: "our-mission", label: "Our Mission" },
  { id: "our-values", label: "Our Values" },
  { id: "join-us", label: "Join Us" },
];

export default function AboutUs() {
  return (
    <main className="bg-white text-gray-800">
      {/* Page hero */}
      <section className="relative bg-gray-900 text-white pt-28 md:pt-36 pb-16 px-4 overflow-hidden">
        <Image
          src="/for_journal/Dhaka_streetfood.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900" />
        <div className="absolute inset-0 bg-dot-grid-light opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#ED7319]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#ED7319]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-[#ED7319] font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              Our Story
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              className={`${fraunces.className} text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.1] mb-6`}
            >
              Connecting Food Lovers
              <br />
              <span className="italic text-[#ED7319]">With Restaurants</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-gray-400 text-lg leading-relaxed">
              Delivering convenience, quality, and reliability across Bangladesh.
            </p>
          </Reveal>
        </div>

        {/* Marquee ticker */}
        <Reveal delay={300} className="relative z-10 mt-16 md:mt-20">
          <div className="border-y border-white/10 py-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee">
              {Array.from({ length: 2 }).map((_, dupe) => (
                <div key={dupe} className="flex items-center">
                  {services.map(({ icon: Icon, label }) => (
                    <span
                      key={`${dupe}-${label}`}
                      className="flex items-center gap-2.5 text-gray-400 text-sm font-medium uppercase tracking-widest px-8"
                    >
                      <Icon size={16} className="text-[#ED7319]" />
                      {label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="relative z-10 flex justify-center mt-10">
          <ChevronDown className="text-white/30 animate-bounce" size={26} />
        </div>
      </section>

      <SectionNav items={navItems} />

      {/* What We Do — service cards */}
      <section className="py-20 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Five Services, <span className="text-orange-500">One App</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to enjoy great food — all in one place.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {services.map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 transition-all group">
                  <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 group-hover:scale-110 rounded-xl flex items-center justify-center mb-3 transition-all">
                    <Icon className="text-orange-500" size={22} />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="our-story" className="py-24 bg-gray-50 overflow-hidden scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label + editorial headline */}
          <Reveal className="max-w-4xl mb-16">
            <span className="block text-[#ED7319] font-semibold text-sm uppercase tracking-widest mb-5">
              Our Story
            </span>
            <h2
              className={`${fraunces.className} text-4xl sm:text-5xl md:text-[3.5rem] font-medium text-gray-900 leading-[1.1]`}
            >
              Food at your fingertips.
              <br />
              <span className="italic text-[#ED7319]">Simple promise.</span>
              <br />
              Serious responsibility.
            </h2>
          </Reveal>

          {/* Core belief — dark statement panel */}
          <Reveal>
            <div className="relative bg-gray-900 rounded-2xl px-10 py-14 md:px-16 md:py-20 mb-16 overflow-hidden">
              <Image
                src="/for_journal/food_culture.jpg"
                alt=""
                fill
                quality={80}
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-900/80" />
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#ED7319]/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/[0.03] pointer-events-none" />
              <p
                className={`${fraunces.className} relative z-10 text-[1.6rem] sm:text-3xl md:text-4xl font-medium text-white leading-snug max-w-3xl`}
              >
                Dinebd was built with one simple belief:
                <br />
                <span className="italic text-[#ED7319]">
                  Bangladeshi food deserves respect.
                </span>
              </p>
            </div>
          </Reveal>

          {/* Narrative */}
          <Reveal className="max-w-3xl mb-16">
            <div className="border-l-2 border-[#ED7319]/30 pl-6 md:pl-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                We connect people with food they trust — from local restaurants,
                home chefs, and kitchens that genuinely care about quality. Not
                shortcuts. Not chaos. Just{" "}
                <span className="font-semibold text-gray-900">bhalo khabar</span>,
                done right.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-6">
                In a market where food delivery often means late orders, poor
                hygiene, and zero accountability, we decided to do things
                differently. We focus on clear rules, fair treatment, and honest
                service — for customers, riders, and restaurants alike.
              </p>
            </div>
          </Reveal>

          {/* Editorial image break */}
          <Reveal className="mb-20">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/for_journal/food_hygiene.jpg"
                alt="A clean, well-run kitchen"
                fill
                quality={85}
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <p
                  className={`${fraunces.className} italic text-white text-2xl sm:text-3xl md:text-4xl font-medium max-w-2xl leading-snug`}
                >
                  “Good food starts with clean kitchens.”
                </p>
              </div>
            </div>
          </Reveal>

          {/* Three stakeholders */}
          <div id="our-people" className="grid md:grid-cols-3 gap-8 mb-20 scroll-mt-28">
            {stakeholders.map(({ label, body, image }, i) => (
              <Reveal key={label} delay={i * 120}>
                <div className="group h-full flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={image}
                      alt=""
                      fill
                      quality={80}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
                      <div className="w-8 h-0.5 bg-[#ED7319] rounded-full mb-2" />
                      <h3 className="font-bold text-white text-lg">{label}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-gray-500 leading-relaxed text-[15px]">
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What We Believe */}
          <Reveal>
            <div className="relative bg-white border border-gray-100 rounded-2xl px-10 py-12 md:px-14 md:py-14 mb-16 shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <h3 className="relative text-2xl font-bold text-gray-900 mb-10">
                What We Believe
              </h3>
              <div className="relative grid sm:grid-cols-2 gap-x-12 gap-y-9">
                {beliefs.map((belief, i) => (
                  <div key={belief} className="flex items-start gap-5">
                    <span className="text-[#ED7319] font-bold text-2xl leading-none tabular-nums flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-gray-800 font-semibold text-lg leading-snug">
                      {belief}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Closing signature */}
          <Reveal className="flex flex-col items-start gap-1 pl-1">
            <p className={`${fraunces.className} italic text-2xl text-gray-900`}>
              Dinebd
            </p>
            <p className="text-gray-400 italic text-lg">
              Proudly local. Built for Bangladesh.
            </p>
            <div className="mt-3 w-10 h-0.5 bg-[#ED7319] rounded-full" />
          </Reveal>
        </div>
      </section>

      {/* Our Mission */}
      <section id="our-mission" className="py-20 bg-white scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative bg-orange-50 border border-orange-100 rounded-2xl p-10 md:p-14 text-center overflow-hidden">
              <Quote
                className="absolute top-6 left-6 text-orange-200"
                size={56}
                strokeWidth={1.5}
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                To make good food easy to access, while doing business with
                honesty, respect, and responsibility. We exist to put food at
                your fingertips without cutting corners. That means clear
                standards, fair treatment, and service people can trust. For
                customers, riders, and food partners alike.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Values */}
      <section id="our-values" className="py-20 bg-gray-50 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Our Values
            </h2>
          </Reveal>

          {/* Value pillars — same copy as before, now broken into its natural
              title/body rhythm instead of one dense paragraph */}
          <div className="max-w-4xl mx-auto mb-16 divide-y divide-gray-200 border-t border-b border-gray-200">
            {valuePillars.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 60}>
                <div className="grid sm:grid-cols-[minmax(0,220px)_1fr] gap-2 sm:gap-8 py-7 px-2 -mx-2 rounded-lg hover:bg-white transition-colors">
                  <h3 className="font-bold text-gray-900 text-lg flex items-baseline gap-3">
                    <span className="text-[#ED7319] text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="relative bg-white border border-gray-200 rounded-xl p-8 overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-orange-200 transition-all group">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#ED7319] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <div className="w-12 h-12 bg-orange-50 group-hover:bg-orange-100 group-hover:scale-110 rounded-xl flex items-center justify-center mb-5 transition-all">
                    <Icon className="text-orange-500" size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section id="join-us" className="relative py-24 bg-gray-900 text-white overflow-hidden scroll-mt-16">
        <Image
          src="/for_journal/catering.jpg"
          alt=""
          fill
          quality={80}
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95" />
        <div className="absolute inset-0 bg-dot-grid-light opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className={`${fraunces.className} text-3xl sm:text-4xl font-medium mb-4`}>
              Be Part of Our Growing Community
            </h2>
            <p className="text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of partners, riders, and team members transforming
              how people enjoy food in Bangladesh.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/partner-with-us">
                <button className="inline-flex items-center gap-2 bg-[#ED7319] hover:bg-orange-600 active:scale-[0.97] text-white font-semibold px-8 py-3 rounded-lg transition-all group">
                  Become a Partner
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <Link href="/rider">
                <button className="border-2 border-white/30 hover:border-white hover:bg-white/10 active:scale-[0.97] text-white font-semibold px-8 py-3 rounded-lg transition-all">
                  Join as a Rider
                </button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
