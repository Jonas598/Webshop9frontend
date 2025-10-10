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

export default function Login() {
  const navigate = useNavigate();
  const context = useContext(allContext);
  const { userLogin } = context;
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInfo.email.length < 3) {
      alert("email Should Be More than 2 Charecters");
    } else if (userInfo.password.length < 6) {
      alert("Password Should Be 6 Charecters or More !!");
    } else {
      await userLogin(userInfo);
      navigate("/");
      window.location.reload(false);
    }
  };

  return (
    <div className="h-[80vh] w-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter all credentials to login</CardDescription>
          {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  name="email"
                  onChange={handleOnChange}
                  placeholder="monika@webshop.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleOnChange}
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Login
          </Button>
          <p className="text-sm">
            Don't have an account yet ?{" "}
            <a className="text-md font-bold underline" href="/signup">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
