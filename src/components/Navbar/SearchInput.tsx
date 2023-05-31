import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SearchResultItem } from "./SearchResult/SearchResultItem";
import { SearchResultFooter } from "./SearchResult/SearchResultFooter";
import useDebounce from "@/src/hooks/useDebounce";
import { collection, documentId, endAt, getDocs, orderBy, query, startAt, where } from "firebase/firestore";
import { firestore } from "@/src/firebase/clientApp";
import { start } from "repl";
import { Community } from "@/src/atoms/communitiesAtoms";

type SearchInputProps = {
  user?: User | null;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce<string>(searchInput, 1000);
  const [searchResult,setSearchResult]=useState<Community[]>([])
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

const handleOnFocus=()=>{
  if(searchResult.length>0){
    setOnFocus(true)
  }else{
     setOnFocus(false);
  }
}
const getSearchResult=async()=>{
  try {
      const searchQuery = query(
        collection(firestore, `communities`),
        orderBy(documentId()),
        startAt(debouncedValue),
        endAt(`${debouncedValue}\uf8ff`)
      );
      const searchDocs = await getDocs(searchQuery);
      const searchResult = searchDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Community[];
      setSearchResult(searchResult);
      setOnFocus(true);
  } catch (error:any) {
    console.log(error.message);
  }
}
  useEffect(() => {
    if(searchInput) getSearchResult();
     else{
      setSearchResult([])
      setOnFocus(false)
     }
  }, [debouncedValue]);

  return (
    <>
      <Flex
        align="center"
        flexGrow={1}
        mr={2}
        maxWidth={user ? "auto" : "600px"}
        direction="column"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" mb={1} />
          </InputLeftElement>
          <Input
            placeholder="Search Reddit"
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              border: "1px solid",
              borderColor: "blue.500",
              boxShadow: "none",
            }}
            height="34px"
            bg="gray.50"
            borderRadius="1.25em"
            borderBottomLeftRadius={onFocus ? "unset" : "1.25em"}
            borderBottomRightRadius={onFocus ? "unset" : "1.25em"}
            onFocus={handleOnFocus}
            //onBlur={() => setOnFocus(false)}
            value={searchInput}
            onChange={handleChange}
          />
        </InputGroup>
        {searchResult && (
          <Box
            width="100%"
            bg="white"
            zIndex={100}
            border="1px solid"
            borderColor="gray.300"
            borderRadius="0px 0px 4px 4px"
            pb={1}
            display={onFocus ? "unset" : "none"}
          >
            <>
              <Text fontWeight={500} fontSize="10pt" p="12px 16px">
                Communities
              </Text>
              <Stack spacing={3}>
                {searchResult.map((item) => {
                  return (
                    <SearchResultItem
                      community={item.id}
                      members={item.numberOfMembers}
                      image={item.imageURL}
                      setOnFocus={setOnFocus}
                    />
                  );
                })}
              </Stack>
              <Divider borderTop="1.5px solid" borderColor="gray.300" />
            </>

            {searchInput && <SearchResultFooter searchInput={searchInput} />}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default SearchInput;
