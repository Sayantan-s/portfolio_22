import { useDebounce } from "@hooks";
import { SearchNormal1 } from "iconsax-react";
import { ChangeEventHandler, useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (eve) => {
    setSearch(eve.target.value);
  };

  useDebounce(
    search,
    () => {
      console.log(search);
    },
    1000
  );

  return (
    <div className="relative">
      <div className="bg-slate-50 px-3 py-2.5 rounded-lg w-full placeholder:text-slate-300 flex space-x-2">
        <SearchNormal1 variant="Broken" size={16} />
        <input
          type="text"
          placeholder="leom_077"
          className="w-full bg-transparent placeholder:text-slate-300 focus:outline-none"
          value={search}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;
