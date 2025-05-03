import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";

const SearchCreators = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredCreators, setFilteredCreators] = useState([]); // State for filtered creators

  // Dummy data for creators
  const creators = [
    { id: 1, name: "John Doe", bio: "Tech reviewer and content creator." },
    { id: 2, name: "Jane Smith", bio: "Travel and lifestyle vlogger." },
    { id: 3, name: "Mike Johnson", bio: "Fitness and health enthusiast." },
    { id: 4, name: "Emily Davis", bio: "Food blogger and recipe creator." },
    { id: 5, name: "Chris Lee", bio: "Gaming and esports streamer." },
  ];

  // Filter creators based on the search query
  useEffect(() => {
    const filtered = creators.filter((creator) =>
      creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCreators(filtered);
  }, [searchQuery]);

  return (
    <div className="container mx-auto p-8">
      <Flex direction="column" align="center" gap="6">
        {/* Page Header */}
        <Heading size="4" className="text-center">
          Search Creators
        </Heading>

        {/* Search Bar */}
        <Flex
          align="center"
          className="w-full max-w-md rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <FaSearch className="mr-2 text-zinc-500 dark:text-zinc-400" />
          <input
            type="text"
            placeholder="Search for creators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-800 placeholder-zinc-500 focus:outline-none dark:text-zinc-200 dark:placeholder-zinc-400"
          />
        </Flex>

        {/* Creators List */}
        <Box className="w-full max-w-md">
          {filteredCreators.length > 0 ? (
            filteredCreators.map((creator) => (
              <Box
                key={creator.id}
                className="mb-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-md dark:border-zinc-800 dark:bg-zinc-900"
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
                  onClick={() => alert(`Viewing profile of ${creator.name}`)}
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
        </Box>
      </Flex>
    </div>
  );
};

export default SearchCreators;