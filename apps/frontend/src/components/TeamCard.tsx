import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "./ui/card.tsx";

const TeamCard = (props: { name: string, role: string, bio: string, image: string }): JSX.Element=> {
    return (
        <Card>
            <CardHeader>
                <h1 className={"text-center"}>{props.name}</h1>
            </CardHeader>
            <CardContent>
                <img src={props.image} alt={props.name} className="object-contain h-64 w-full" />

            </CardContent>
            <CardDescription className={"text-center"}>
                {props.bio}
            </CardDescription>
            <CardFooter>{props.role}</CardFooter>
        </Card>
    );
};
export default TeamCard;
