import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Welcome = () => {
    return (
        <div className="flex justify-left gap-2 items-center p-4">
            <div>
                <Avatar className="size-16">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>

            <h1 className="text-3xl font-semibold text-green-500">
                Hola Julia
            </h1>
        </div>
    )
}

export default Welcome;

