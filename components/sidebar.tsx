'use client'
import { useState } from "react"
import { Menu, X, LayoutDashboard, Keyboard, Eye, Calendar, Info, Wrench, Phone, MessageSquare, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger Menu */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-2 top-2 z-50  text-black p-2 rounded-md hover:bg-gray-800 md:hidden transition"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${isOpen ? "translate-x-0" : "hidden"
          } md:flex md:w-64 md:relative md:translate-x-0 fixed top-0 left-0 h-screen w-64 bg-black/80 text-white p-4 flex-col z-50 transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute md:hidden top-4 right-4 text-white hover:text-gray-300 transition"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold">CodingLab</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {[
              { label: "Dashboard", icon: LayoutDashboard },
              { label: "Shortcuts", icon: Keyboard },
              { label: "Overview", icon: Eye },
              { label: "Events", icon: Calendar },
              { label: "About", icon: Info },
              { label: "Services", icon: Wrench },
              { label: "Contact", icon: Phone },
              { label: "Feedback", icon: MessageSquare },
            ].map(({ label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href="#"
                  className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links */}
        <div className="flex gap-4 mt-auto pt-4">
          {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
            <Link
              key={idx}
              href="#"
              className="hover:text-gray-300 transition-colors"
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}
