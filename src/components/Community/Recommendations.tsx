import { Community } from "@/src/atoms/communitiesAtoms";
import { firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Skeleton, SkeletonCircle, Stack, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";

export const Recommendations: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [communities, setCommunities] = useState<Community[]>([]);
  const {
    communityStateValue,
    onJoinLeaveCommunity,
  } = useCommunityData();
  const getCommunityRecommendations = async () => {
    try {
      setLoading(true);
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const recCommunities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      
      setCommunities(recCommunities);
    } catch (error: any) {
      console.log(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/recCommsArt.png)"
        backgroundSize="cover"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/recCommsArt.png')"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
            <Flex justify="space-between" align="center">
              <SkeletonCircle size="10" />
              <Skeleton height="10px" width="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities.map((community, index) => {
              const isJoined = !!communityStateValue.mySnippets.find(
                (snippet) => snippet.communityId === community.id
              );
              return (
                <div key={community.id}>
                  <Link key={community.id} href={`/r/${community.id}`}>
                    <Flex
                      position="relative"
                      align="center"
                      fontSize="10pt"
                      borderBottom="1px solid"
                      borderColor="gray.200"
                      p="10px 12px"
                      fontWeight={600}
                    >
                      <Flex width="80%" align="center">
                        <Flex width="15%">
                          <Text mr={2}>{index + 1}</Text>
                        </Flex>
                        <Flex align="center" width="80%">
                          {community.imageURL ? (
                            <Image
                              alt="community image"
                              borderRadius="full"
                              boxSize="28px"
                              src={community.imageURL}
                              mr={2}
                            />
                          ) : (
                            <Icon
                              as={FaReddit}
                              fontSize={30}
                              color="brand.100"
                              mr={2}
                            />
                          )}
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >{`r/${community.id}`}</span>
                        </Flex>
                      </Flex>
                      <Box position="absolute" right="10px">
                        <Button
                          height="22px"
                          fontSize="8pt"
                          onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            onJoinLeaveCommunity(community, isJoined);
                          }}
                          variant={isJoined ? "outline" : "solid"}
                        >
                          {isJoined ? "Joined" : "Join"}
                        </Button>
                      </Box>
                    </Flex>
                  </Link>
                </div>
              );
            })}
            <Box p="10px 20px">
              <Button height="30px" width="100%">
                View All
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};
