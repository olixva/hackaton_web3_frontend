import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Interface for component props
interface WelcomeProps {
    name: string
    profileImage: string
}


// Welcome component that displays avatar and personalized user greeting
const Welcome = ({ name, profileImage }: WelcomeProps) => {
    return (
        // Main container with horizontal layout
        <div className="flex justify-left gap-3 items-center p-6">
            {/* User avatar container */}
            <div>
                {/* Avatar with profile image and name initial fallback */}
                <Avatar className="w-16 h-16">
                    <AvatarImage src={profileImage} alt={name}  className="welcome-avatar-img"/>
                    <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>

            {/* Personalized greeting title with user's name */}
            <h1 className="text-3xl font-semibold text-primaryGreen">
                Hola {name}
            </h1>
        </div>
    )
}

// Exports the component as default
export default Welcome;

