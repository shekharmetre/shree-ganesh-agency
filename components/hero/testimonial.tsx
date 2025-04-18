"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Card } from "primereact/card"
import { Avatar } from "primereact/avatar"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Pharmacist",
    company: "HealthCare Pharmacy",
    content:
      "This distributor has revolutionized our inventory management. Their wide range of products and prompt delivery have significantly improved our service to patients.",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Hospital Administrator",
    company: "City General Hospital",
    content:
      "The reliability and quality of medicines supplied have been consistently excellent. Their customer service is top-notch, always ready to assist with any queries.",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Clinic Manager",
    company: "Wellness Medical Center",
    content:
      "We've seen a notable reduction in our operational costs since partnering with this distributor. Their competitive pricing and efficient delivery system are unmatched.",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Robert Thompson",
    role: "Owner",
    company: "Thompson's Family Pharmacy",
    content:
      "As a small pharmacy owner, I appreciate their flexible ordering options and personalized service. It's made a huge difference in how we manage our inventory.",
    avatar: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    role: "Chief of Medicine",
    company: "Sunrise Hospital",
    content:
      "Their extensive range of specialized medications has been crucial for our hospital. The ease of ordering and reliable supply chain have improved our patient care significantly.",
    avatar: "/placeholder.svg",
  },
]

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <Card className="w-[300px] md:w-[350px] lg:w-[400px] h-full shadow-md p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar
          image={testimonial.avatar}
          shape="circle"
          size="large"
          className="border border-gray-300"
        >
          {!testimonial.avatar && (
            <span className="text-lg font-semibold">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          )}
        </Avatar>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-gray-500">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
      <p className="text-gray-700">&ldquo;{testimonial.content}&rdquo;</p>
    </Card>
  )
}

export default function AutoScrollingTestimonials() {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView && !isHovered) {
      controls.start({
        x: [0, -100 * testimonials.length],
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        },
      })
    } else {
      controls.stop()
    }
  }, [controls, isInView, isHovered])

  return (
    <div className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div className="flex space-x-6" animate={controls}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
