import React from "react";
import { CheckIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import allContext from "../contexts/allContext";
import { useContext, useEffect } from "react";
import userLogo from '/assets/userLogo.png'


const Profile = () => {
  const context = useContext(allContext);
  const { fetchUserData, fetchedUserData } = context;
  useEffect(() => {
    fetchUserData();
  }, []);
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
                placeholder="Address"
                value={fetchedUserData.address}
                disabled
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
