import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SpeedIcon from "@mui/icons-material/Speed";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

const Feature = ({ icon, title, description }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      p: 3,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: 2,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
      },
    }}
  >
    <Box
      sx={{
        color: "#4461F2",
        mb: 2,
        p: 2,
        backgroundColor: "rgba(68, 97, 242, 0.1)",
        borderRadius: "50%",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h6" sx={{ mb: 1, color: "#2C3E50", fontWeight: 600 }}>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Chuyển đổi token thành boolean
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFF",
        pt: { xs: 8, md: 10 },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 12, md: 20 },
          pb: { xs: 8, md: 12 },
          background: "linear-gradient(135deg, #4461F2 0%, #2941F0 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 8,
            }}
          >
            {/* Hero Content */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3.75rem" },
                  lineHeight: 1.2,
                  color: "black",
                }}
              >
                Giải Toán
                <br />
                với Trợ Lý AI
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontWeight: 400,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  color: "black",
                }}
              >
                Nhận giải pháp từng bước cho mọi bài toán. Chỉ cần tải ảnh lên
                và để AI của chúng tôi xử lý!
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate(isAuthenticated ? "/solver" : "/login")}
                sx={{
                  fontSize: "1.1rem",
                  py: 1.5,
                  px: 6,
                  backgroundColor: "white",
                  color: "#4461F2",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Dùng Ngay
              </Button>
            </Box>

            {/* Hero Image */}
            {!isMobile && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src="/math-solver-demo.png"
                  alt="Gemetry"
                  sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: "auto",
                    borderRadius: 4,
                  }}
                />
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 8,
            fontWeight: 700,
            color: "#2C3E50",
          }}
        >
          Tại Sao Chọn Công Cụ Giải Toán Của Chúng Tôi?
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          <Feature
            icon={<SpeedIcon sx={{ fontSize: 40 }} />}
            title="Giải Pháp Tức Thì"
            description="Nhận giải pháp chi tiết từng bước trong vài giây. Không còn phải chờ đợi hay vất vả với các bài toán phức tạp."
          />
          <Feature
            icon={<AutoStoriesIcon sx={{ fontSize: 40 }} />}
            title="Giải Thích Chi Tiết"
            description="Học thông qua những giải thích rõ ràng, chi tiết giúp bạn hiểu sâu hơn về các khái niệm."
          />
          <Feature
            icon={<PrecisionManufacturingIcon sx={{ fontSize: 40 }} />}
            title="Công Nghệ AI"
            description="Được hỗ trợ bởi công nghệ AI tiên tiến để cung cấp giải pháp chính xác và đáng tin cậy."
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Landing;
