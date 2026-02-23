import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { fetchParams } from "../../data/fetchParameters";
import { useSpotify } from "@/context/SpotfyContext";

const listComponent = () => {
  const { setSearchLimit } = useSpotify();
  return (
    <div className="focus:ring-0 border-0 ">
      <Combobox
        items={fetchParams}
        onValueChange={(value) => {
          setSearchLimit(Number(value));
        }}
      >
        <ComboboxInput
          placeholder="--"
          className="    text-[whiteSmoke]
    border-0
    ring-0
    outline-none
    shadow-none
    focus:outline-none
    focus:ring-0
    focus:shadow-none
    focus-visible:outline-none
    focus-visible:ring-0
    bg-transparent
    w-20"
        />
        <ComboboxContent>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};

export default listComponent;
