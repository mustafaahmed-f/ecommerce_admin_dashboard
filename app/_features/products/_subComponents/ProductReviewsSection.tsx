import { Review } from "../types/reviewType";
import SingleReview from "./SingleReview";

interface ProductReviewsSectionProps {
  reviews: Review[];
}

function ProductReviewsSection({ reviews }: ProductReviewsSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.length > 0 ? (
        reviews.map((review, index) => <SingleReview key={index} {...review} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No reviews available.
        </p>
      )}
    </div>
  );
}

export default ProductReviewsSection;
