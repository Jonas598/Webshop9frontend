import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import allContext from "../contexts/allContext";
import { useContext, useEffect, useId, useState } from "react";
import userLogo from "/assets/userLogo.png";

import { CheckIcon, ImagePlusIcon, XIcon } from "lucide-react";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useFileUpload } from "@/hooks/use-file-upload";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const context = useContext(allContext);
  const { fetchUserData, fetchedUserData, updateuser } = context;
  useEffect(() => {
    fetchUserData();
  }, []);

  const [userInfo, setUserInfo] = useState({
    name: ``,
    address: ``,
  });

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (userInfo.name.length < 3) {
      alert("name Should Be More than 2 Charecters");
    } else if (userInfo.address.length < 5) {
      alert("Address Should Be 5 Charecters or More !!");
    } else {
      await updateuser(userInfo);
    //   navigate("/profile");
      window.location.reload(false);
    }
  };
  //   const
  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center">
      <div className="border p-2 rounded-lg">
        <div className="h-[80px] w-[80px] flex items-center justify-center m-auto">
          <img src={userLogo} alt="" />
        </div>
        <div className="px-6 pt-4 pb-6">
          <form className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`name`}>Name</Label>
                <Input
                  id={`name`}
                  name="name"
                  placeholder="Monika"
                  value={fetchedUserData.name}
                  type="text"
                  readOnly
                  disabled
                />
              </div>
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`email`}>Email</Label>
              <div className="relative">
                <Input
                  id={`email`}
                  name="email"
                  className="peer pe-9"
                  placeholder="Email"
                  value={fetchedUserData.email}
                  type="text"
                  required
                  disabled
                />
              </div>
            </div>

            <div className="*:not-first:mt-2">
              <Label htmlFor={`address`}>Address</Label>
              <Input
                id={`address`}
                name="address"
                placeholder="Address"
                value={fetchedUserData.address}
                disabled
              />
            </div>
            <div className="m-6 flex items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Edit profile</Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                  <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                      Edit profile
                    </DialogTitle>
                  </DialogHeader>
                  <div className="p-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor={`name`}>Name</Label>
                        <Input
                          id={`name`}
                          name="name"
                          placeholder={`${fetchedUserData.name}`}
                          value={userInfo.name}
                          type="text"
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className="*:not-first:mt-2">
                      <Label htmlFor={`email`}>Email</Label>
                      <div className="relative">
                        <Input
                          id={`email`}
                          name="email"
                          className="peer pe-9"
                          placeholder="Email"
                          value={fetchedUserData.email}
                          type="text"
                          required
                          readOnly
                          disabled
                        />
                      </div>
                    </div>

                    <div className="*:not-first:mt-2">
                      <Label htmlFor={`address`}>Address</Label>
                      <Input
                        id={`address`}
                        name="address"
                        placeholder={`${fetchedUserData.address}`}
                        value={userInfo.address}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <DialogFooter className="border-t px-6 py-4">
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={handleClick} type="button">
                        Save changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
