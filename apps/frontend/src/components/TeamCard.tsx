import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card.tsx";
import { useState } from "react";
// import {HoverCard, HoverCardTrigger, HoverCardContent} from "./ui/hovercard.tsx";

const TeamCard = (props: {
  name: string;
  role: string;
  bio?: string;
  image: string;
  quote?: string;
}): JSX.Element => {
  const [showQuote, setShowQuote] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const nameParts = props.name.split(" ");

  const toggleQuote = () => {
    setShowQuote(!showQuote);
    setShowCard(!showCard);
  };

  return (
    <div>
      {showCard && (
        <Card
          className={
            "max-w-md border-gray-200 hover:scale-110 hover:bg-neutral-200 " +
            "transition-all duration-200 h-full"
          }
          onClick={toggleQuote}
        >
          <CardHeader>
            <h1 className={"text-center"}>
              {nameParts.map((part, index) => (
                <div key={index}>{part}</div>
              ))}
            </h1>
          </CardHeader>
          <CardContent>
            <img
              src={props.image}
              alt={props.name}
              className="object-cover w-48 h-48 block mx-auto rounded-full border-4 border-blue-900 shadow-md"
            />
          </CardContent>
          <CardDescription className={"text-center dark:text-neutral-200"}>
            {props.bio}
          </CardDescription>
          <CardFooter>{props.role}</CardFooter>
        </Card>
      )}
      {showQuote && (
        <div>
          <Card
            className={
              "max-w-md border-gray-200 hover:scale-110 hover:bg-neutral-200" +
              "transition-all duration-200 h-96"
            }
            onClick={toggleQuote}
          >
            <CardHeader></CardHeader>
            <CardContent>
              <img
                src={props.image}
                alt={props.name}
                className="object-cover w-48 h-48 block mx-auto rounded-full border-4 border-blue-900 shadow-md"
              />
            </CardContent>
            <CardDescription className={"text-center"}>
              <p>Favorite Quote</p>
              <p className="text-center">{props.quote}</p>
            </CardDescription>
            <CardFooter></CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
export default TeamCard;
