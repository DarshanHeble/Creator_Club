import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { userService } from "@services/userService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user: privyUser, ready, authenticated } = usePrivy();
  const navigate = useNavigate();

  const { login } = useLogin({
    onComplete() {
      if (ready && authenticated && privyUser) {
        navigate(`/user/${privyUser?.id}/dashboard`);

        userService.createUser({
          id: privyUser.id,
          walletAddress: privyUser.wallet?.address || "",
          role: "fan",
        });
      }
    },
  });

  const { logout } = useLogout({
    onSuccess() {
      navigate("/");
    },
  });

  return {
    privyUser,
    ready,
    authenticated,
    login,
    logout,
  };
};
