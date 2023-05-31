import { Button, Flex, Input, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ImageContainer } from "./ImageContainer";

type ImageUploadProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrag: (event: React.ChangeEvent<any>) => void;
  handleDrop: (event: React.ChangeEvent<any>) => void;
  dragActive: boolean;
  setSelectedTab: (value: string) => void;
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  handleDrag,
  dragActive,
  handleDrop,
  setSelectedTab,
  selectedFile,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {selectedFile ? (
        <ImageContainer
          image={selectedFile}
          setSelectedFile={setSelectedFile}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <Flex
          onDragEnter={handleDrag}
          justify="center"
          align="center"
          width="100%"
          border={dragActive ? "3px dashed" : "1px dashed"}
          borderRadius={4}
          p={20}
          borderColor={dragActive ? "blue.500" : "gray.200"}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!dragActive && (
            <Flex align="center">
              <Text fontSize="11pt" color="blue.500" fontWeight={500} mr={2}>
                Drag and drop image or
              </Text>
              <Button
                variant="outline"
                height="28px"
                onClick={() => selectedFileRef.current?.click()}
              >
                Upload
              </Button>
              <Input
                type="file"
                ref={selectedFileRef}
                hidden
                onChange={onChange}
              />
            </Flex>
          )}
          {dragActive && (
            <Text fontSize="11pt" color="blue.500" fontWeight={500}>
              Drop here to upload
            </Text>
          )}
        </Flex>
      )}

    </>
  );
};
