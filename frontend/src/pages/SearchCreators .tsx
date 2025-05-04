// import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FaPowerOff, FaSearch } from "react-icons/fa";
// import { useAuth } from "@hooks/useAuth";

// const DashBoard = () => {
//   const { user, authenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState(""); // State for search input

//   useEffect(() => {
//     // Check if the user is authenticated
//     if (!authenticated) {
//       navigate("/");
//     }
//   }, [authenticated, navigate]);

//   const handleSearch = () => {
//     navigate("/search-creators", { state: { searchQuery } });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <Flex direction="column" gap="6" align="center">
//         {/* Dashboard Header */}
//         <Flex justify="between" align="center" className="w-full max-w-4xl">
//           <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
//             Dashboard
//           </Heading>
//           <Button
//             variant="soft"
//             color="red"
//             onClick={() => {
//               logout();
//               navigate("/");
//             }}
//             className="flex items-center gap-2"
//           >
//             <FaPowerOff />
//             Logout
//           </Button>
//         </Flex>

//         {/* Search Bar */}
//         <Flex
//           align="center"
//           className="w-full max-w-4xl rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
//         >
//           <FaSearch className="mr-2 text-zinc-500 dark:text-zinc-400" />
//           <input
//             type="text"
//             placeholder="Search for creators..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-500 focus:outline-none dark:text-zinc-200 dark:placeholder-zinc-400"
//           />
//           <Button
//             variant="soft"
//             color="blue"
//             onClick={handleSearch}
//             className="ml-2"
//           >
//             Search
//           </Button>
//         </Flex>
//       </Flex>
//     </div>
//   );
// };

// export default DashBoard;
// ```
// ```tsx
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchCreators = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [filteredCreators, setFilteredCreators] = useState([]); // State for filtered creators

  // Fetch creators using react-query
  const {
    data: creators = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["creators"],
    queryFn: async () => {
      const response = await userService.getCreators();
      return response;
    },
  });

  useEffect(() => {
    // Retrieve the search query from the navigation state
    const searchQuery = location.state?.searchQuery || "";

    // Filter creators based on the search query
    const filtered = creators.filter((creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCreators(filtered);
  }, [location.state]);

  return (
    <div className="container mx-auto p-6">
      <Flex direction="column" gap="6" align="center">
        {/* Page Header */}
        <Flex justify="between" align="center" className="w-full max-w-4xl">
          <Heading size="4" className="text-zinc-800 dark:text-zinc-200">
            Search Results
          </Heading>
          <Button
            variant="soft"
            color="gray"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </Button>
        </Flex>

        {/* Creators List */}
        <Box className="w-full max-w-4xl">
          <Flex direction="column" gap="4">
            {filteredCreators.length > 0 ? (
              filteredCreators.map((creator) => (
                <Box
                  key={creator.id}
                  className="rounded-lg border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Text className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                    {creator.name}
                  </Text>
                  <Text className="text-sm text-zinc-600 dark:text-zinc-400">
                    {creator.bio}
                  </Text>
                  <Button
                    variant="soft"
                    color="blue"
                    className="mt-4"
                    onClick={() =>
                      alert(`Viewing profile of ${creator.name}`)
                    }
                  >
                    View Profile
                  </Button>
                </Box>
              ))
            ) : (
              <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                No creators found.
              </Text>
            )}
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default SearchCreators;
