import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "./ui/card.tsx";

const TechCard = (props: { name: string, role: string, bio: string, image: string }): JSX.Element=> {
    const nameParts = props.name.split(' ');

    return (
        <Card className={"max-w-md border-gray-200 hover:scale-110 hover:bg-neutral-200 " +
            "transition-all duration-200 h-full"}>
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
                             className="object-cover w-48 h-48 block mx-auto rounded-lg border-4 border-blue-900 shadow-md" />            </CardContent>
                    <CardDescription className={"text-center"}>
                        {props.bio}
                    </CardDescription>
                    <CardFooter>{props.role}</CardFooter>
                </Card>
    );
};
export default TechCard;

