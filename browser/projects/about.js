import { Box, Text } from "theme-ui";

const About = () => {
  return (
    <Box>
      <Text
        sx={{
          fontSize: [6],
          fontFamily: "heading",
          letterSpacing: "heading",
          my: [2],
        }}
      >
        Forest offset projects
      </Text>
      <Text
        sx={{
          fontSize: [3],
          my: [2],
          mb: [3],
          pr: [3],
        }}
      >
        This is a public database of compliance forest carbon offset projects.
        It is based on primary project documents and some of our own analysis.
        We assembled it for purposes of research, analysis, transparency, and
        oversight. Read our article for more info.
      </Text>
    </Box>
  );
};

export default About;
