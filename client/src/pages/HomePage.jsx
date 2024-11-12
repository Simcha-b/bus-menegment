import React from "react";
import { Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))[0].name;

  return (
    <Container maxWidth="xl" dir="rtl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
          ברוך הבא, {user}
        </Typography>

        <Grid container spacing={3}>
          {/* Main Actions Section */}
          <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 2 } }}>
            <Paper elevation={4} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                פעולות מהירות
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/orders")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  נסיעות
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/customers")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  לקוחות
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/operators")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  מבצעים
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/orders/new")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  הזמנה חדשה
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => navigate("/reports")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  דוחות
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => navigate("/distance")}
                  sx={{
                    width: 250,
                    height: 120,
                    fontSize: 32,
                    fontWeight: "bold",
                  }}
                >
                  חישוב מרחק
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Notifications Section */}
          <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 1 } }}>
            <Paper elevation={4} sx={{ p: 3, mb: 3, minHeight: "300px" }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                התראות מערכת
              </Typography>
              {/* Placeholder for notifications */}
              <Box >
                <a href="#">יש 2 נסיעות השבוע שעדיין לא שובץ להם נהג</a>
                <a href="#">יש 3 לקוחות שיש להם חוב פתוח</a>
              </Box>
            </Paper>
          </Grid>

          {/* Updates Section */}
          <Grid item xs={12} sx={{ order: 3 }}>
            <Paper elevation={4} sx={{ p: 3, minHeight: "200px" }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                עדכונים ומידע
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={4} sx={{ p: 2, minHeight: "150px" }}>
                    <Typography variant="h6">מזג אוויר</Typography>
                    {/* Weather content placeholder */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={4} sx={{ p: 2, minHeight: "150px" }}>
                    <Typography variant="h6">עדכוני תנועה</Typography>
                    {/* Traffic updates placeholder */}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={4} sx={{ p: 2, minHeight: "150px" }}>
                    <Typography variant="h6">הודעות מערכת</Typography>
                    {/* System messages placeholder */}
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
