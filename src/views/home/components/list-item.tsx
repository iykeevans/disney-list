import { useNavigate } from "react-router-dom";

import CONSTANTS from "@/utils/constants";

type ListItemProps = {
  imageUrl: string;
  name: string;
  film: string;
  id: number;
};

const ListItem = (props: ListItemProps) => {
  const { imageUrl, name, film, id } = props;
  const imagePlaceholderUrl = CONSTANTS.IMAGE_PLACEHOLDER_URL;

  const navigate = useNavigate();

  return (
    <button
      className="flex items-center justify-between hover:bg-slate-100 rounded-md py-3 px-3 cursor-pointer w-full"
      onClick={() => navigate(`/character/${id}`)}
    >
      <div className="flex items-center gap-x-2.5">
        <div className="w-8 h-6 rounded-md bg-slate-200 shrink-0">
          <img
            src={imageUrl ? imageUrl : imagePlaceholderUrl}
            alt={`${name}_image`}
            className="object-cover rounded-md h-full w-full shrink-0"
          />
        </div>

        <div className="text-sm md:text-base">{name}</div>
      </div>

      <small>{film}</small>
    </button>
  );
};

export default ListItem;
