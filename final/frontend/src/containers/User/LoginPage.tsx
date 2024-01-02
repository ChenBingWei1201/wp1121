import { useNavigate } from "react-router-dom";
import { Magic } from "magic-sdk";
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_USERS_QUERY, CREATE_USER_MUTATION } from "../../graphql";
import { env } from "../../env";
import { UserContext } from "../../context/userContext";
import { Button } from "../../components/Login/ui/button";
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
  const { data } = useQuery(ALL_USERS_QUERY);
  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const handleSubmit = async (e: any) => {
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
      const [findUser] = ((data && data.AllUsers) ?? []).filter(
        (e) => e?.password === email,
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
            photoLink: "https://http.cat/200",
          },
        },
        onCompleted: () => {
          fetchUser();
        },
      });
      alert("Sign Up Successful!");
    } else {
      const [findUser] = ((data && data.AllUsers) ?? []).filter(
        (e) => e?.password === email,
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
        </CardContent>
      </Card>
    </>
  );
};

export default LoginPage;
