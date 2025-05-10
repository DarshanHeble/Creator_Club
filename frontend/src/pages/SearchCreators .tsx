import { useState } from "react";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@services/userService";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import Loader from "@components/Loading";

const SearchCreators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // Filter creators based on search query
  const filteredCreators = creators.filter((creator) =>
    (creator.userName || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-8">
      <Flex direction="column" align="center" gap="6">
        {/* Page Header */}
        <Heading size="7" className="text-center">
          Search Creators
        </Heading>

        {/* Search Bar */}
        <Flex
          align="center"
          className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <FaSearch className="mr-2 text-zinc-500 dark:text-zinc-400" />
          <input
            type="text"
            placeholder="Search for creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent p-1 text-[1.1rem] text-zinc-800 placeholder-zinc-500 focus:outline-none dark:text-zinc-200 dark:placeholder-zinc-400"
          />
        </Flex>

        {/* Loading, Error, or Creators List */}
        <Box className="w-full max-w-2xl">
          {isLoading ? (
            <div className="flex h-32 items-center justify-center">
              <Loader />
            </div>
          ) : isError ? (
            <Text className="text-center text-sm text-red-600 dark:text-red-400">
              Failed to load creators. Please try again later.
            </Text>
          ) : filteredCreators.length > 0 ? (
            filteredCreators.map((creator) => (
              <Box
                key={creator.id}
                className="mb-4 cursor-pointer rounded-lg border border-zinc-200 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                onClick={() => navigate(`/user/${creator.id}/profile`)}
              >
                {/* Avatar and Name */}
                <Flex align="center" gap="4">
                  <Avatar
                    src={creator.profilePhoto}
                    size={"5"}
                    fallback={(creator.userName?.[0] || "?").toUpperCase()}
                  />
                  <div className="flex flex-col">
                    <Text className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                      {creator.userName || "Unnamed Creator"}
                      {/* {creator.id || "Creator id"} */}
                    </Text>

                    {/* Email */}
                    <Text className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {creator.email || "No email available"}
                    </Text>
                  </div>
                </Flex>
              </Box>
            ))
          ) : (
            <Text className="text-center text-sm text-zinc-600 dark:text-zinc-400">
              No creators found.
            </Text>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default SearchCreators;
