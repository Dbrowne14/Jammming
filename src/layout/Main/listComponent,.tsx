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
    <div>
      <Combobox
        items={fetchParams}
        onValueChange={(value) => {
          setSearchLimit(Number(value));
        }}
      >
        <ComboboxInput
          placeholder="--"
          className="text-[whiteSmoke]  font-Audowide
          border-0
          ring-0
          w-18"
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
