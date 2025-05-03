import { usePrivy, useLogin, useLogout } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService } from "@services/userService";

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
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.id) return;
      try {
        const userData = await userService.getUser(user.id);
        setUserRole(userData.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    fetchUserRole();
  }, [user?.id]);

  return {
    user,
    userRole,
    ready,
    authenticated,
    login,
    logout,
  };
};
