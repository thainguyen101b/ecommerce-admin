import { Box, Typography, Divider } from "@mui/material";

export const InstructionAside = ({
  title = "Instructions",
  instructions = [],
}: {
  title: string;
  instructions: string[];
}) => (
  <Box
    sx={{
      width: 250,
      margin: "1em",
      padding: "1em",
      border: "1px solid #ccc",
      borderRadius: 1,
    }}
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Divider sx={{ mb: 1 }} />
    {instructions.map((text, index) => (
      <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
        • {text}
      </Typography>
    ))}
  </Box>
);
