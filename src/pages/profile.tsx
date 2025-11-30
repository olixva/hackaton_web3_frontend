import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Plus, Copy } from "lucide-react";
// Imports Drawer components for showing wallet details
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
// Imports hooks
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";

// Interface for optional profile properties
interface ProfileProps {
  name?: string;
  email?: string;
  walletName?: string;
  avatarUrl?: string;
  bsvAddress?: string;
}

// User profile page with info and wallet details
export function Profile({
  name,
  email,
  walletName = "Wallet",
  avatarUrl,
  bsvAddress = "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
}: ProfileProps) {
  // Gets user data from context
  const { user, loading } = useUser();
  // State to show copy feedback
  const [copied, setCopied] = useState(false);

  // Copies BSV address to clipboard and shows temporary feedback
  const handleCopy = () => {
    navigator.clipboard.writeText(user?.bsv_address || bsvAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Shows message if no user data available
  if (!user) {
    return <p style={{ padding: "20px" }}>Profile not found</p>;
  }

  // Uses user data or default properties
  const profileName = name || user.name;
  const profileEmail = email || user.email;
  const profileAvatar = avatarUrl || user.profile_image_url;

  // Defines elements shown in profile
  const profileItems = [
    { label: profileName, id: "name", clickable: false },
    { label: profileEmail, id: "email", clickable: false },
    { label: walletName, id: "wallet", clickable: true },
  ];

  return (
    // Main profile container
    <div className="flex flex-col items-center bg-neutral-50 p-4 pt-8">
      {/* User avatar with edit button */}
      <div className="relative mb-8">
        {/* Avatar with profile image and initials fallback */}
        <Avatar className="h-32 w-32 border-4 border-white">
          <AvatarImage
            src={profileAvatar}
            alt={profileName}
            className="object-cover"
          />
          <AvatarFallback className="text-2xl">
            {profileName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {/* Floating button to edit profile picture */}
        <Button
          size="icon"
          className="absolute bottom-0 right-0 h-10 w-10 rounded-full border-4 border-white bg-primaryGreen hover:bg-primaryGreen/80"
          aria-label="Edit profile picture"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>
      {/* Profile items list */}
      <div className="w-full max-w-sm space-y-3">
        {/* Renders each profile item */}
        {profileItems.map((item) => {
          // Renders drawer for wallet item
          if (item.clickable) {
            return (
              // Drawer with wallet details and transaction options
              <Drawer key={item.id}>
                <DrawerTrigger asChild>
                  {/* Clickable card that opens drawer */}
                  <Card className="group cursor-pointer border border-primaryGreen bg-white transition-all hover:border-primaryGreen rounded-full shadow-none">
                    <CardContent className="flex items-center justify-between p-4">
                      <span className="text-base font-medium text-primaryGreen pl-2">
                        {item.label}
                      </span>
                      <ChevronRight className="h-5 w-5 text-primaryGreen transition-transform group-hover:translate-x-1" />
                    </CardContent>
                  </Card>
                </DrawerTrigger>
                <DrawerContent className="bg-white mb-40">
                  <div className="mx-auto w-full max-w-md px-8 pb-8 pt-10">
                    <DrawerHeader className="px-0 text-center">
                      <DrawerTitle className="text-3xl font-bold text-primaryGreen">
                        Wallet
                      </DrawerTitle>
                    </DrawerHeader>
                    {/* Section showing balance in euros and satoshis */}
                    <div className="my-4 rounded-full border-2 border-primaryGreen bg-white px-12 py-2 max-w-xs mx-auto">
                      <p className="text-lg font-bold text-primaryGreen">
                        Balance
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-primaryGreen">
                          {user?.balance_euro?.toFixed(4) ?? 0}€
                        </p>
                        <p className="text-base font-semibold text-black">
                          {user?.balance_satoshis?.toLocaleString("en-US") ?? 0}{" "}
                          sats
                        </p>
                      </div>
                    </div>
                    {/* Section showing BSV address with copy button */}
                    <div className="mb-4 rounded-full border-2 border-primaryGreen bg-white px-10 py-4 max-w-xs mx-auto">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <p className="text-lg font-bold text-primaryGreen">
                            BSV address
                          </p>
                          <p className="text-xs font-medium text-primaryGreen">
                            {(user?.bsv_address || bsvAddress).slice(0, 24) +
                              "..."}
                          </p>
                        </div>
                        {/* Button to copy BSV address */}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={handleCopy}
                          className="self-stretch rounded-r-full text-primaryGreen -ml-2 h-12 w-12 p-0 hover:bg-transparent"
                          aria-label="Copy address"
                        >
                          <Copy />
                        </Button>
                      </div>
                    </div>
                    {/* Button to add balance to wallet */}
                    <Button
                      size="lg"
                      className="h-12 w-full rounded-full bg-primaryGreen text-base font-semibold text-white hover:bg-primaryGreen/80"
                    >
                      Add balance
                    </Button>
                    {/* Footer with provider information */}
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-xs text-primaryGreen">
                        Powered by
                      </span>
                      <span className="text-xs font-bold text-black">Ramp</span>
                      <span className="text-xs font-medium text-neutral-500">
                        NETWORK
                      </span>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            );
          }

          // Renderiza tarjeta estática para elementos no clickeables
          return (
            <Card
              key={item.id}
              className="group cursor-pointer border border-primaryGreen bg-white transition-all hover:border-primaryGreen rounded-full shadow-none"
            >
              <CardContent className="flex items-center justify-between p-4">
                <span className="text-base font-medium text-primaryGreen pl-2">
                  {item.label}
                </span>
                <ChevronRight className="h-5 w-5 text-primaryGreen transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
