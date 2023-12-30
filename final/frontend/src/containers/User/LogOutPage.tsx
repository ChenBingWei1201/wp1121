import { Magic } from "magic-sdk";
import { useNavigate } from "react-router-dom";
import { env } from "../../env";
import { useEffect, useCallback } from "react";

const LogOutPage = () => {
  const navigate = useNavigate();
  const magic = new Magic(env.MAGIC_PUBLIC_API_KEY);

  const logout = useCallback(async () => {
    await magic.user.logout();
    navigate("/");
    window.location.reload();
  }, []);

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <p>Logout</p>
    </>
  );
};

export default LogOutPage;
