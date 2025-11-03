import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Coins, Gauge, Handshake, Wrench } from "lucide-react";

const Why = () => {
  const whys = [
    {
      title: "Financing Made Easy",
      desc: "Get flexible financing tailored to your vehicle needs.",
      icon: <Coins />,
    },
    {
      title: "Carefully Selected Range",
      desc: "Durable vehicles built for African roads.",
      icon: <Gauge />,
    },
    {
      title: "Trusted By Millions",
      desc: "Bajaj Auto, the world’s 3rd largest maker of 2 & 3 wheelers. Trusted globally.",
      icon: <Handshake />,
    },
    {
      title: "Vehicle Service Maintenance",
      desc: "Expert maintenance advice and support. Call 050 329 0556.",
      icon: <Wrench />,
    },
  ];
  return (
    <div className="px-4 sm:px-8 ">
      <h1 className="text-3xl text-center sm:text-4xl font-bold">
        WHY TO CHOOSE SOMOCO?
      </h1>
      <div className="flex py-8 w-full flex-col gap-6">
        <ItemGroup className="gap-4 grid sm:grid-cols-2">
          {whys.map((why) => (
            <Item key={why.title} variant="outline" role="listitem">
              <ItemMedia className="my-auto size-10" variant="icon">
                {why.icon}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{why.title}</ItemTitle>
                <ItemDescription>{why.desc}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  );
};

export default Why;
