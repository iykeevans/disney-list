import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import Loader from "@/components/ui/loader";

import CONSTANTS from "@/utils/constants";
import QUERY_KEYS from "@/utils/query-keys";

import { getDisneyCharacter } from "@/services";

const Character = () => {
  const { id } = useParams();

  const { isLoading, data: response } = useQuery({
    queryKey: [QUERY_KEYS.getDisneyCharacter, id],
    queryFn: () => getDisneyCharacter(id as string),
  });

  return (
    <div className="w-[90%] md:max-w-2xl mx-auto py-16">
      <button className="mb-8 font-semibold text-sky-400">
        <Link to="/">Back</Link>
      </button>

      {isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          <Loader /> <small className="text-sm">Loading...</small>
        </div>
      )}

      {!isLoading && (
        <div className="flex gap-x-7">
          <div className="h-[70px] w-[100px] bg-slate-200 rounded-md">
            <img
              loading="lazy"
              src={
                response?.data.data.imageUrl
                  ? response?.data.data.imageUrl
                  : CONSTANTS.IMAGE_PLACEHOLDER_URL
              }
              alt="character"
              className="rounded-md object-cover h-full w-full"
            />
          </div>

          <div>
            <h1 className="text-3xl">{response?.data.data.name}</h1>
            <div className="font-bold mt-6">Movies:</div>
            <div className="mt-0.5">{response?.data.data.films.join(", ")}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
