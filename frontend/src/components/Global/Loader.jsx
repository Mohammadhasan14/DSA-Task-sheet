import { Box, CircularProgress, Container, Typography } from "@mui/material";

export default function Loader({ loaderText, theme }) {
    return (
        <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <Box textAlign="center">
                <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                    {loaderText}
                </Typography>
            </Box>
        </Container>
    )
}
