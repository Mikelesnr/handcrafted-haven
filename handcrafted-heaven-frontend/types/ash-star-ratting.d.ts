declare module "ash-star-ratting" {
  import { FC } from "react";

  interface StarRatingProps {
    defaultValue?: number;
    onChange?: (value: number) => void;
    className?: string;
  }

  const StarRating: FC<StarRatingProps>;
  export default StarRating;
}
