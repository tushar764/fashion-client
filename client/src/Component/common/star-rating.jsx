import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating,handleRatingChange}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant="outline"
          size="icon"
          onClick={ handleRatingChange ?()=>handleRatingChange(star):null}
          className={`group p-2 rounded-full border border-muted shadow-sm transition-colors duration-200 ${
            star <= rating
              ? "text-yellow-500 hover:bg-yellow-100"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <StarIcon
            className={`w-5 h-5 transition-colors duration-200 ${
              star <= rating ? "fill-yellow-400" : "fill-muted"
            }`}
          />
        </Button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
