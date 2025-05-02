import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <Card className="border-2 border-black w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">Bienvenue sur Music App</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    Gérez facilement vos chansons, utilisateurs et genres.
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button asChild>
                        <Link href="/songs">Voir les chansons</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
