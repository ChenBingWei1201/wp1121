import { useNavigate } from "react-router-dom";
import { Magic } from "magic-sdk";
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_USERS_QUERY, CREATE_USER_MUTATION } from "../../graphql";
import { env } from "../../env";
import { UserContext } from "../../context/userContext";
// Run: npx shadcn-ui@latest add button
import { Button } from "../../components/Login/ui/button";
// Run: npx shadcn-ui@latest add card
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/Login/ui/card";

import AuthInput from "../../components/Login/AuthInput";
import { validateUsername, validateStudentId } from "../../lib/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const magic = new Magic(env.MAGIC_PUBLIC_API_KEY);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { fetchUser } = useContext(UserContext);
  const queryUser = useQuery(ALL_USERS_QUERY);
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (!validateUsername(name)) {
        alert("Invalid Username!");
        return null;
      }
      if (!validateStudentId(studentId)) {
        alert("Invalid Student ID!");
        return null;
      }
      const [findUser] = queryUser.data.AllUsers.filter(
        (e) => e.password === email,
      );
      if (findUser) {
        alert("Email already Signed up!");
        return null;
      }
      await magic.auth.loginWithEmailOTP({ email: email });
      createUser({
        variables: {
          userInput: {
            name: name,
            password: email,
            studentID: studentId,
            photoLink: "",
          },
        },
        onCompleted: () => {
          fetchUser();
        },
      });
      alert("Sign Up Successful!");
    } else {
      const [findUser] = queryUser.data.AllUsers.filter(
        (e) => e.password === email,
      );
      if (!findUser) {
        alert("Email not registered!");
        return null;
      }
      await magic.auth.loginWithEmailOTP({ email: email });
      fetchUser();
      alert("Log In Successful!");
    }
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-3xl m-2">Login Page</h1>
      <button
        onClick={() => navigate("/")}
        className="border-2 border-black px-3 m-1"
      >
        home
      </button>
      {/* <button onClick={() => {
        setUser(
          {
            id: 727,
            name: "WYSI",
            password: "findUser.email",
            studentId: "B11901727",
            photoLink: "findUser.photoLink",
            introduction: "?",
          }
        )
      }} >CLICK ME</button> */}
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>Sign {isSignUp ? "Up" : "In"}</CardTitle>
        </CardHeader>
        <CardContent className=" flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <AuthInput
              label="Email"
              type="email"
              value={email}
              setValue={setEmail}
            />
            {isSignUp && (
              <AuthInput
                label="Name"
                type="text"
                value={name}
                setValue={setName}
              />
            )}
            {isSignUp && (
              <AuthInput
                label="Student ID"
                type="text"
                value={studentId}
                setValue={setStudentId}
              />
            )}
            <div className="text-sm text-gray-500">
              {isSignUp ? (
                <span>
                  Already have an account?{" "}
                  <a
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sign In
                  </a>
                </span>
              ) : (
                <span>
                  Do not have an account?{" "}
                  <a
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign Up
                  </a>
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Sign {isSignUp ? "Up" : "In"}
            </Button>
          </form>
          {/* <div className="flex w-full items-center gap-1 py-2">
          <div className="h-[1px] grow border-t"></div>
          <p className="text-xs text-gray-400">or</p>
          <div className="h-[1px] grow border-t"></div>
        </div> */}

          {/* <Button
          onClick={async () => {
            signIn("github", {
              callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/projects`,
            });
          }}
          className="flex w-full"
          variant={"outline"}
        > */}
          {/* Remember to copy "github.png" to ./public folder
          <Image src="/github.png" alt="github icon" width={20} height={20} />
          <span className="grow">Sign In with Github</span> */}
          {/* </Button> */}
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
