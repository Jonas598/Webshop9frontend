import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import allContext from "../contexts/allContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function SignUp() {

  const navigate = useNavigate();
  const context = useContext(allContext);
  const { userSignUp } = context;



  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.name.length < 3) {
      alert("Name Should Be More than 2 Charecters");
    } else if (userInfo.password.length < 6) {
      alert("Password Should Be 6 Charecters or More !!");
    } else {
      await userSignUp(userInfo);
      navigate('/home');
      window.location.reload(false);
    }
  };


  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      
      <Card className="w-full max-w-sm ">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="text-2xl ">Create Account </CardTitle>
          <CardDescription>
            Fill all details to create your account
          </CardDescription>
          {/* <CardAction>
          <Button variant="link">Login</Button>
        </CardAction> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Name<sup>❋</sup>
                </Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  value={userInfo.name}
                  placeholder="Monika"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email<sup>❋</sup>
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleOnChange}
                  value={userInfo.email}
                  placeholder="monika@websop.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                {/* <div className="flex items-center"> */}
                <Label htmlFor="password">
                  Password<sup>❋</sup>
                </Label>
                {/* </div> */}
                <Input
                  id="password"
                  name="password"
                  onChange={handleOnChange}
                  value={userInfo.password}
                  type="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">
                  Address<sup>❋</sup>
                </Label>
                <textarea
                  className="border rounded-lg p-1"
                  rows={2}
                  id="address"
                  name="address"
                  type="text"
                  onChange={handleOnChange}
                  value={userInfo.address}
                  placeholder="Your Address here"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Sign Up
          </Button>
          <p className="text-sm">
            Alreaady have an account ?{" "}
            <a className="text-md font-bold underline" href="/login">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
