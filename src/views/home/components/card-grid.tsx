import { getDisneyCharacters } from "@/services";
import CardItem from "./card-item";
import QUERY_KEYS from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import useRandomNumberGenerator from "@/utils/hooks/use-random-number-generator";

const CardGrid = () => {
  const pageSize = 100;

  const { isLoading, data: response } = useQuery({
    queryKey: [QUERY_KEYS.getDisneyCharacters, pageSize],
    queryFn: () => getDisneyCharacters({ pageSize }),
  });

  const { generate } = useRandomNumberGenerator();

  return (
    <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">
      <CardItem
        isLoading={isLoading}
        data={response?.data?.data}
        startIndex={generate(pageSize)}
        pageSize={pageSize}
      />

      <CardItem
        isLoading={isLoading}
        data={response?.data?.data}
        startIndex={generate(pageSize)}
        pageSize={pageSize}
      />
    </div>
  );
};

export default CardGrid;
