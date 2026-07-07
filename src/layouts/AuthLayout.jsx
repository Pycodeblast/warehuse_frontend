import { Box, Paper, Typography } from "@mui/material";

function AuthLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 450,
          p: 5,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          color="primary"
        >
          Warehouse AI
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mt: 1, mb: 4, color: "text.secondary" }}
        >
          Smart Inventory Management System
        </Typography>

        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3 }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "text.secondary" }}
          >
            {subtitle}
          </Typography>
        )}

        {children}
      </Paper>
    </Box>
  );
}

export default AuthLayout;