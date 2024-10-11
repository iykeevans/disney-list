import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";

import CardItem from "./components/card-item";
import ListItem from "./components/list-item";

import QUERY_KEYS from "@/utils/query-keys";
import useRandomNumberGenerator from "@/utils/hooks/use-random-number-generator";

import { getDisneyCharacters } from "@/services";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data: response } = useQuery({
    queryKey: [QUERY_KEYS.getDisneyCharacters, searchQuery],
    queryFn: () => getDisneyCharacters({ pageSize: 15, name: searchQuery }),
  });

  const list = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };
  const item = {
    from: {
      opacity: 0,
      y: 20,
    },
    to: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const { generate } = useRandomNumberGenerator();

  return (
    <div className="w-[90%] md:max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-9">Disney Characters</h1>

      <div className="flex flex-col md:flex-row gap-x-5 gap-y-5">
        <CardItem
          isLoading={isLoading}
          data={response?.data?.data}
          startIndex={generate(15)}
        />

        <CardItem
          isLoading={isLoading}
          data={response?.data?.data}
          startIndex={generate(15)}
        />
      </div>

      <div className="pt-11 pb-4">
        <Input
          placeholder="Search..."
          onChange={({ target }) => setSearchQuery(target.value)}
        />
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          <Loader /> <small className="text-sm">Loading...</small>
        </div>
      )}

      {!isLoading && (
        <motion.div initial="from" animate="to" variants={list}>
          {response?.data?.data?.map((character) => (
            <motion.div variants={item} key={character._id}>
              <ListItem
                name={character.name}
                film={character.films[0]}
                imageUrl={character.imageUrl}
                id={character._id}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
