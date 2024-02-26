import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "./ui/card.tsx";
import {HoverCard, HoverCardTrigger, HoverCardContent} from "./ui/hovercard.tsx";

const TeamCard = (props: { name: string, role: string, bio: string, image: string, quote: string }): JSX.Element=> {
    const nameParts = props.name.split(' ');

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
        <Card className={"h-full"}>
            <CardHeader>
                <h1 className={"text-center"}>
                    {nameParts.map((part, index) => (
                        <div key={index}>{part}</div>
                    ))}
                </h1>
            </CardHeader>
            <CardContent>
                <img src={props.image}
                     alt={props.name}
                     className="object-cover w-48 h-48 block mx-auto rounded-full border-4 border-blue-900 shadow-md object-contain h-64 w-full" />            </CardContent>
            <CardDescription className={"text-center"}>
                {props.bio}
            </CardDescription>
            <CardFooter>{props.role}</CardFooter>
        </Card>
            </HoverCardTrigger>
            <HoverCardContent>
                <div className="flex flex-col justify-center items-center text-gray-700 bg-gray-100 p-5 rounded-lg shadow-md">
                    <h6 className="mb-2 uppercase text-sm font-bold tracking-wide">Favorite Quote</h6>
                    <p className="text-center text-lg leading-relaxed">{props.quote}</p>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
export default TeamCard;
