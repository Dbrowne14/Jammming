
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/subComponents/drawer"

import { ScoringData } from "@/data/scoringParameters"

const drawerComponent = () => {
    const {weeklyTheme} = ScoringData
  return (
<Drawer>
  <DrawerTrigger className="bg-[rgba(255,255,255,0.42)] text-black font-bold  border shadow-2xl border-green-600 px-2 rounded-2xl">Weekly Theme</DrawerTrigger>
  <DrawerContent className="bg-gray-200">
    <DrawerHeader>
      <DrawerTitle>{`${weeklyTheme} Songs`}</DrawerTitle>
      <DrawerDescription>{`Todays theme requires you to make a 10 song playlist with exclusively ${weeklyTheme} songs`}</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose className="w-50 place-self-center">
        <p>Cancel </p>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
  )
}

export default drawerComponent
