import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface WelcomeProps {
    name: string
    profileImage: string
}


const Welcome = ({ name, profileImage }: WelcomeProps) => {
    return (
        <div className="flex justify-left gap-3 items-center p-6">
            <div>
                <Avatar className="w-16 h-16">
                    <AvatarImage src={profileImage} alt={name}  className="welcome-avatar-img"/>
                    <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>

            <h1 className="text-3xl font-semibold text-primaryGreen">
                Hola {name}
            </h1>
        </div>
    )
}

export default Welcome;

