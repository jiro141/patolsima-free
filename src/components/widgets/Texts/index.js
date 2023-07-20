import { Text } from "@chakra-ui/react";

export const Title = ({ title }) => {
  return (
    <>
      <Text style={{ fontSize: "17px", fontWeight: "bold", color: "#000" }}>
        {title}
      </Text>
    </>
  );
};

export const Titlelight = ({ title,color }) => {
    return (
      <>
        <Text style={{ fontSize: "16px", fontWeight: "normal", color: `${color}` }}>
          {title}
        </Text>
      </>
    );
  };

  export const subTitleBold = ({ title,color="#888888" }) => {
    return (
      <>
        <Text style={{ fontSize: "17px", fontWeight: "normal", color: `${color}` }}>
          {title}
        </Text>
      </>
    );
  };
