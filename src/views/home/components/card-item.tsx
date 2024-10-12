import { useState } from "react";
import { motion } from "framer-motion";

import Loader from "@/components/ui/loader";
import { Card } from "@/components/ui/card";

import useInterval from "@/utils/hooks/use-interval";
import useRandomNumberGenerator from "@/utils/hooks/use-random-number-generator";

import { TCharacter } from "@/services";
import CONSTANTS from "@/utils/constants";
import { Link } from "react-router-dom";

const CardItem = (props: {
  isLoading: boolean;
  data: TCharacter[] | undefined;
  startIndex: number;
}) => {
  const { isLoading, data, startIndex } = props;
  const imagePlaceholderUrl = CONSTANTS.IMAGE_PLACEHOLDER_URL;

  const [randomSelection, setRandomSelection] = useState(startIndex);

  const { generate } = useRandomNumberGenerator(startIndex);

  useInterval(() => {
    setRandomSelection(generate(15));
  }, 10000);

  return (
    <Card className="md:w-1/2 rounded-md px-4 py-4 h-[185px] flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center gap-x-2 h-full w-full">
          <Loader /> <small className="text-sm">Loading...</small>
        </div>
      )}

      {!isLoading && (
        <motion.div
          initial="from"
          animate="to"
          key={randomSelection}
          variants={{ from: { opacity: 0, x: 20 }, to: { opacity: 1, x: 0 } }}
          className="h-full flex flex-col"
        >
          <div className="flex gap-x-5">
            <div className="bg-slate-200 w-10 h-10 rounded-md">
              <img
                loading="lazy"
                src={
                  data![randomSelection]?.imageUrl
                    ? data![randomSelection]?.imageUrl
                    : imagePlaceholderUrl
                }
                alt={`${data![randomSelection]?.name}_image`}
                className="h-full w-full object-cover rounded-md"
              />
            </div>

            <div>{data![randomSelection]?.name}</div>
          </div>

          <button className="mt-auto self-start font-medium text-sky-400">
            <Link to={`character/${data![randomSelection]?._id}`}>
              View details
            </Link>
          </button>
        </motion.div>
      )}
    </Card>
  );
};

export default CardItem;
