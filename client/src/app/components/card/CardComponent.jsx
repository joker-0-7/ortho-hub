import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CardComponent({ title, value, description, Icon }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-center">
          <p className="text-center mx-auto">{Icon}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{value}</p>
      </CardContent>
      <CardFooter>
        <p className="text-center mx-auto">{description}</p>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
