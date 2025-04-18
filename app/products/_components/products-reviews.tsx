"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsDown, ThumbsUp } from "lucide-react"



import { Button } from "@/components/ui/button"
import { ProgressBar } from "primereact/progressbar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { InputTextarea } from "primereact/inputtextarea"
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"


interface ReviewsInfo {
  average: number
  count: number
}

interface ProductReviewsProps {
  productId: number
  reviews: ReviewsInfo
}

// Sample review data
const sampleReviews = [
  {
    id: 1,
    author: "Rahul Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-12-15",
    title: "Excellent medication, works quickly",
    content:
      "I've been using this medication for my allergies for years. It works quickly and doesn't cause drowsiness like some other antihistamines. Highly recommended!",
    helpful: 24,
    notHelpful: 2,
  },
  {
    id: 2,
    author: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2023-11-28",
    title: "Good product, but takes time to work",
    content:
      "This medication is effective for my allergies, but it takes about an hour to start working. Otherwise, no complaints. The price is reasonable too.",
    helpful: 15,
    notHelpful: 3,
  },
  {
    id: 3,
    author: "Amit Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-10-10",
    title: "Best antihistamine I've tried",
    content:
      "After trying several different antihistamines, this one works the best for me. No drowsiness and controls my symptoms completely. Will continue to purchase.",
    helpful: 32,
    notHelpful: 1,
  },
]

// Rating distribution for the ProgressBar bars
const ratingDistribution = [
  { stars: 5, percentage: 68 },
  { stars: 4, percentage: 22 },
  { stars: 3, percentage: 7 },
  { stars: 2, percentage: 2 },
  { stars: 1, percentage: 1 },
]

export function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [helpfulClicked, setHelpfulClicked] = useState<Record<number, string>>({})
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")

  const handleHelpful = (reviewId: number, type: "helpful" | "notHelpful") => {
    setHelpfulClicked((prev) => ({
      ...prev,
      [reviewId]: prev[reviewId] === type ? "" : type,
    }))
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the review to your backend
    alert("Review submitted! (This is just a demo)")
    setShowReviewForm(false)
    setReviewRating(0)
    setReviewTitle("")
    setReviewContent("")
  }

  return (
    <div className="space-y-6">
      {/* Review summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl font-bold">{reviews.average}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(reviews.average) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Based on {reviews.count} reviews</div>
        </div>

        <div className="space-y-2 md:col-span-2">
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-2">
              <div className="w-12 text-sm text-right">{rating.stars} stars</div>
              <ProgressBar value={rating.percentage} className="h-2" />
              <div className="w-10 text-sm text-muted-foreground">{rating.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Write a review button */}
      <div className="flex justify-center">
        <Button onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel Review" : "Write a Review"}
        </Button>
      </div>

      {/* Review form */}
      {showReviewForm && (
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <div className="mb-2">Rating</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setReviewRating(star)} className="focus:outline-none">
                    <Star
                      className={`h-6 w-6 ${
                        star <= reviewRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="review-title" className="block mb-2">
                Review Title
              </label>
              <input
                id="review-title"
                className="w-full p-2 border rounded-md"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Summarize your experience"
                required
              />
            </div>

            <div>
              <label htmlFor="review-content" className="block mb-2">
                Review Content
              </label>
              <InputTextarea
                id="review-content"
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                placeholder="Share your experience with this product"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={reviewRating === 0}>
                Submit Review
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-6">
        {sampleReviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                  <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <h4 className="font-medium mb-2">{review.title}</h4>
            <p className="text-sm mb-4">{review.content}</p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Was this review helpful?</span>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${helpfulClicked[review.id] === "helpful" ? "bg-primary/10" : ""}`}
                onClick={() => handleHelpful(review.id, "helpful")}
              >
                <ThumbsUp className="h-3 w-3 mr-1" />
                Yes ({helpfulClicked[review.id] === "helpful" ? review.helpful + 1 : review.helpful})
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs ${helpfulClicked[review.id] === "notHelpful" ? "bg-primary/10" : ""}`}
                onClick={() => handleHelpful(review.id, "notHelpful")}
              >
                <ThumbsDown className="h-3 w-3 mr-1" />
                No ({helpfulClicked[review.id] === "notHelpful" ? review.notHelpful + 1 : review.notHelpful})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
