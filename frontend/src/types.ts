export type User = {
  id: string;
  walletAddress: string;
  userName?: string;
  email?: string;
  password?: string;
  isCreator: boolean;
};

// export type userRole = "creator" | "fan";

export type ApiError = {
  message: string;
  statusCode: number;
  details?: string;
};

export type ServiceResponse<T> = {
  data?: T;
  error?: ApiError;
};
