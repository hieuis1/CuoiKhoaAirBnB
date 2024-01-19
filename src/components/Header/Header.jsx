import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import { getInforUserApi, infoUserAPI } from "../../apis/userAPI";
import MenuIcon from "@mui/icons-material/Menu";
import { LoadingButton } from "@mui/lab";
import avatar from "../../assets/pngwing.com (2).png";
import logo from "../../assets/illustrations/pngwing.com (1).png";
import {
  Stack,
  Container,
  Menu,
  Tooltip,
  Avatar,
  MenuItem,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { PATH } from "../../routes/path";
import {
  useAuth,
  useHistoryTicket,
} from "../../contexts/UserContext/UserContext";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

const settings = ["Tài khoản của tôi", "Đăng xuất"];

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useAuth();
  const { setValuesData } = useHistoryTicket();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { mutate: handleInfoUser, isPending } = useMutation({
    mutationFn: (payload) => infoUserAPI(payload),
    onSuccess: (values) => {
      navigate(PATH.HISTORY_TICKET);
      setValuesData(values);
    },
    onError: (error) => {
      console.log("🚀  error:", error);
    },
  });

  const handleHistory = () => {
    handleInfoUser();
  };
  const handleUser = (index) => {
    console.log("index", index);
    if (index == 1) {
      handleLogout();
      window.location.reload();
      navigate("/");
    } else {
      navigate("/profile");
    }
  };
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const { data: infoUser, isPending: inforPeding } = useQuery({
    queryKey: ["userInfoHeader"],
    queryFn: () => getInforUserApi(user.user.id),
  });

  if ((!inforPeding && user) || user == null) {
    return (
      <>
        <AppBar position="sticky" color="inherit">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  mr: "auto",
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  alignItems: "center",
                }}
              >
                <Link to={PATH.HOME} className="text-3xl text-sky-600">
                  <img
                    style={{
                      width: "150px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    src={logo}
                    alt=""
                  />
                </Link>
              </Box>

              {/* Responsive */}
              {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                 
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "justify",
                      }}
                    >
                      <Link> Lịch chiếu phim</Link>
                      <Link> Cụm rạp</Link>
                      <Link> Về chúng tôi</Link>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box> */}

              <Box
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Link to={PATH.HOME} className="text-3xl text-sky-600">
                  <img
                    style={{
                      width: "150px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    src={logo}
                    alt=""
                  />
                </Link>
              </Box>
              {/* End Responsive */}

              <Box
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                }}
              >
                {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))} */}
                <Stack
                  direction={"row"}
                  spacing={4}
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {/* <Link> Lịch chiếu phim</Link>
                  <Link> Cụm rạp</Link>
                  <Link> Về chúng tôi</Link> */}
                </Stack>
              </Box>

              {currentUser ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: "500",
                          marginRight: "10px",
                          color: "black",
                        }}
                      >
                        Hi,{user.user.name}{" "}
                      </p>{" "}
                      <Avatar
                        alt="Remy Sharp"
                        src={infoUser.avatar == "" ? avatar : infoUser.avatar}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting, index) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography
                          onClick={() => handleUser(index)}
                          textAlign="center"
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Stack spacing={2} direction="row">
                  <Button
                    variant="outlined"
                    style={{
                      border: "1px solid #ff385c",
                      color: " #ff385c",
                    }}
                    onClick={() => navigate(PATH.SIGN_UP)}
                  >
                    Đăng ký
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#ff385c",
                      border: "1px solid #ff385c",
                    }}
                    variant="contained"
                    onClick={() => navigate(PATH.SIGN_IN)}
                  >
                    Đăng nhập
                  </Button>
                </Stack>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </>
    );
  }
};

export default Header;
