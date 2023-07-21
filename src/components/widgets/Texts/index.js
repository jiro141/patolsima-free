import { Text } from "@chakra-ui/react";

export const Title = ({ title }) => {
  return (
    <>
      <Text style={{ fontSize: '1rem', fontWeight: "bold", color: "#000" }}>
        {title}
      </Text>
    </>
  );
};

export const Titlelight = ({ title,color }) => {
    return (
      <>
        <Text style={{ fontSize: "1rem", fontWeight: "normal", color: `${color}` }}>
          {title}
        </Text>
      </>
    );
  };

  export const SubTitlelight = ({ title,color="#888888" }) => {
    return (
      <>
        <Text style={{ fontSize: "15px", fontWeight: "normal", color: `${color}` }}>
          {title}
        </Text>
      </>
    );
  };
