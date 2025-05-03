import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { userService } from "@services/userService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const { user: privyUser, ready, authenticated } = usePrivy();
  const navigate = useNavigate();

  // Fetch user data from your database
  const {
    data: fetchedUser,
    refetch: refetchUser,
    isLoading,
  } = useQuery({
    queryKey: ["user", privyUser?.id],
    queryFn: async () => {
      if (!privyUser?.id) return null;
      const userData = await userService.getUser(privyUser.id);
      return userData;
    },
    enabled: false, // Disable automatic fetching until explicitly triggered
  });

  const { login } = useLogin({
    onComplete() {
      if (ready && authenticated && privyUser) {
        navigate(`/user/${privyUser?.id}/dashboard`);

        console.log(privyUser.wallet?.chainType);

        userService
          .createUser({
            id: privyUser.id,
            walletAddress: privyUser.wallet?.address || "",
            role: "fan",
          })
          .then(() => {
            toast("User Created Successfully");
            refetchUser(); // Fetch user data after successful creation
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
    isLoading,
    user: fetchedUser, // Return the fetched user
    refetchUser, // Expose refetch function if needed externally
  };
};
