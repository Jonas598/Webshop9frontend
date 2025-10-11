import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import allContext from "../../contexts/allContext";
import { useContext, useEffect } from "react";
import userLogo from "/assets/userLogo.png";

export default function ProfileDropDown() {
  const navigate = useNavigate();

  const context = useContext(allContext);
  const { fetchUserData, fetchedUserData } = context;
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>
              <img src={userLogo} alt="" />
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {fetchedUserData.name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {fetchedUserData.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate("/profile");
            }}
          >
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <div>Profile</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/cart");
            }}
          >
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <div>Cart</div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              navigate("/about");
            }}
          >
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <div>About</div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("webshopAuthtoken");
            navigate("/signup");
          }}
        >
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <div>Logout</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
