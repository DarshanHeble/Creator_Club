import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, ready, authenticated } = usePrivy();
  const { login } = useLogin({
    onComplete() {
      if (authenticated) {
        navigate(`/user/${user?.id}/dashboard`);
      }
    },
  });
  const { logout } = useLogout({
    onSuccess() {
      navigate("/");
    },
  });
  const navigate = useNavigate();

  //   const loginWithRedirect = useCallback(async () => {
  //     try {
  //       await login();
  //       // After successful login, user will be redirected to dashboard
  //       if (user?.id) {
  //         navigate(`/user/${user.id}/dashboard`);
  //       }
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     }
  //   }, [login, navigate, user?.id]);

  //   const logout = useCallback(async () => {
  //     try {
  //       await privyLogout();
  //       // After logout, redirect to landing page
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Logout failed:", error);
  //     }
  //   }, [privyLogout, navigate]);

  return {
    user,
    ready,
    authenticated,
    login,
    logout,
  };
};
