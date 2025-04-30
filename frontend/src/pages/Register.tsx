import { useState } from "react";
     import { useNavigate } from "react-router-dom";
     import createUser from "../services/api"; // Default import (assumed to be an Axios instance)
     import bcrypt from "bcryptjs";
     import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";

     const Register = () => {
       const navigate = useNavigate();
       const [formData, setFormData] = useState({
         userName: "",
         email: "",
         password: "",
       });
       const [error, setError] = useState("");

       const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };

       const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
         try {
           // Hash the password before sending it to the backend
           const hashedPassword = await bcrypt.hash(formData.password, 10);

           // Send the data to the backend with AxiosRequestConfig
           await createUser({
             url: "/api/register", // Placeholder URL, confirm with teammate
             method: "POST",
             data: {
               userName: formData.userName,
               email: formData.email,
               password: hashedPassword,
               walletAddress: "",
               isCreator: false,
             },
           });

           // Redirect to the login page after successful registration
           navigate("/login");
         } catch (err) {
           console.error("Error registering user:", err);
           setError("Failed to register. Please try again.");
         }
       };

       return (
         <Flex
           direction="column"
           align="center"
           justify="center"
           className="h-screen bg-gradient-to-br from-blue-100 to-blue-300 dark:from-neutral-800 dark:to-neutral-900"
         >
           <Box className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl dark:bg-zinc-900">
             <Heading size="4" className="mb-6 text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200">
               Register
             </Heading>
             {error && (
               <Text className="mb-4 text-center text-sm text-red-500 bg-red-100 p-2 rounded-lg dark:bg-red-900">
                 {error}
               </Text>
             )}
             <form onSubmit={handleSubmit}>
               <Flex direction="column" gap="5">
                 <div>
                   <label htmlFor="userName" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                     Username
                   </label>
                   <input
                     type="text"
                     id="userName"
                     name="userName"
                     placeholder="Enter your username"
                     value={formData.userName}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                   />
                 </div>
                 <div>
                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                     Email
                   </label>
                   <input
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Enter your email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                   />
                 </div>
                 <div>
                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                     Password
                   </label>
                   <input
                     type="password"
                     id="password"
                     name="password"
                     placeholder="Enter your password"
                     value={formData.password}
                     onChange={handleChange}
                     required
                     className="w-full px-4 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200"
                   />
                 </div>
                 <Button
                   type="submit"
                   variant="soft"
                   color="blue"
                   className="w-full py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                 >
                   Register
                 </Button>
               </Flex>
             </form>
             <Text className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
               Already have an account?{" "}
               <Button
                 variant="ghost"
                 className="text-blue-500 hover:underline"
                 onClick={() => navigate("/login")}
               >
                 Login
               </Button>
             </Text>
           </Box>
         </Flex>
       );
     };

     export default Register;