import { Facebook, Instagram, Twitter, Dribbble } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    href: "#",
    alt: "Facebook",
    Icon: Facebook, // Using Lucide's Facebook icon
  },
  {
    href: "#",
    alt: "Instagram",
    Icon: Instagram, // Using Lucide's Instagram icon
  },
  {
    href: "#",
    alt: "Twitter",
    Icon: Twitter, // Using Lucide's Twitter icon
  },
  {
    href: "#",
    alt: "Dribbble",
    Icon: Dribbble, // Using Lucide's Dribbble icon
  },
];

const footerInfo = [
  {
    title: "About Us",
    links: [
      { text: "Company History", href: "#" },
      { text: "Meet the Team", href: "#" },
      { text: "Employee Handbook", href: "#" },
      { text: "Careers", href: "#" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { text: "Web Development", href: "#" },
      { text: "Web Design", href: "#" },
      { text: "Marketing", href: "#" },
      { text: "Google Ads", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Online Guides", href: "#" },
      { text: "Conference Notes", href: "#" },
      { text: "Forum", href: "#" },
      { text: "Downloads", href: "#" },
      { text: "Upcoming Events", href: "#" },
    ],
  },
  {
    title: "Helpful Links",
    links: [
      { text: "FAQs", href: "#" },
      { text: "Support", href: "#" },
      { text: "Live Chat", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-indigo-600 p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            Make Your Next Pharma Distributor!
          </strong>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:ring-3 focus:outline-hidden"
            href="/register"
          >
            <span className="text-sm font-medium">Let's Get Started</span>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerInfo.map((section, index) => (
            <div key={index} className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">{section.title}</p>
              <ul className="mt-8 space-y-4 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a className="text-gray-700 transition hover:text-gray-700/75" href={link.href}>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <ul className="flex justify-center gap-6 sm:justify-end">
            {socialLinks.map((social, index) => (
              <li key={index}>
                <a
                  href={social.href}
                  rel="noreferrer"
                  target="_blank"
                  className="text-teal-700 transition hover:text-teal-700/75"
                >
                  <span className="sr-only">{social.alt}</span>
                  <social.Icon size={24} />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-16 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Image
                src="/logo.svg"
                alt="Footer Logo"
                width={100}
                height={100}
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
              Copyright &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
