import {
  Box,
  Button,
  Container,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GROUP_CODE } from "../../../constants";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "../../../apis/userAPI";
import { LoadingButton } from "@mui/lab";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { useAuth } from "../../../contexts/UserContext/UserContext";
import { Helmet } from "react-helmet-async";
import { bgGradient } from "../../../theme/css";
import { useTheme, alpha } from "@mui/material/styles";
import Swal from "sweetalert2";

const schemaSignup = yup.object({
  name: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .min(6, "Tài khoản ít nhất 6 ký tự")
    .max(8, "Tài khoản không quá 8 ký tự"),
  password: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Mật khẩu ít nhất 8 ký tự và bao gồm 1 ký tự đặc biệt, 1 ký tự viết hoa và viết thường"
    ),
  email: yup.string().required("Vui lòng nhập thông tin"),
  phone: yup.string().required("Vui lòng nhập thông tin"),
  birthday: yup.date().required("Vui lòng nhập thông tin"),
  gender: yup.boolean().required("Vui lòng nhập thông tin"),
});

const SignUp = () => {
  const theme = useTheme();
  const [err, setErr] = useState(null);
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
    mode: "all",
    resolver: yupResolver(schemaSignup),
  });

  const { mutate: handleSignup, isPending } = useMutation({
    mutationFn: (values) => signupAPI(values),
    onSuccess: (values) => {
      if (values.response) {
        setErr(values.response.data.content);
      } else {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công",
          showConfirmButton: true,
          timer: 1500,
        }).then((result) => {
          if (result.isConfirmed) {
            setErr(null);
            navigate(PATH.SIGN_IN);
          }
        });
      }
    },
    onError: (error) => {
      alert("Lỗi rồi");
    },
  });

  // const field = register('name')

  // const handleSubmit = () => {
  // do something
  // const innerFunction = () => {}
  // return innerFunction
  // }

  // const fn = handleSubmit()()

  const onSubmit = (values) => {
    // Gọi API
    handleSignup(values);
    // Gọi API xong thì, rediẻct sang trang đăng nhập
  };
  if (currentUser) {
    return <Navigate to={PATH.HOME} />;
  }
  return (
    <>
      {/* <Container maxWidth="sm"> */}
      <Box
        style={{ height: "150vh" }}
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: "src/assets/background/overlay_4.jpg",
          }),
          height: 1,
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item lg={8}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: 1 }}
            >
              <Card
                sx={{
                  p: 5,
                  width: 1,
                  mt: 10,
                  maxWidth: 420,
                }}
              >
                <form
                  onSubmit={handleSubmit(
                    // (values) => {onSubmit(values)},
                    onSubmit
                    // (errors) => {}
                  )}
                >
                  <Stack spacing={3}>
                    {err ? <Alert severity="error">{err}</Alert> : ""}
                    <TextField
                      label="Email"
                      fullWidth
                      error={Boolean(errors.email)}
                      helperText={Boolean(errors.email) && errors.email.message}
                      {...register("email")}
                    ></TextField>

                    <TextField
                      label="Tài khoản"
                      fullWidth
                      error={Boolean(errors.name)}
                      helperText={Boolean(errors.name) && errors.name.message}
                      {...register("name")}
                    ></TextField>

                    <TextField
                      label="Mật khẩu"
                      type="password"
                      error={Boolean(errors.password)}
                      helperText={
                        Boolean(errors.password) && errors.password.message
                      }
                      fullWidth
                      {...register("password")}
                    ></TextField>
                    <TextField
                      label="Số điện thoại"
                      fullWidth
                      error={Boolean(errors.phone)}
                      helperText={Boolean(errors.phone) && errors.phone.message}
                      {...register("phone")}
                    ></TextField>

                    <TextField
                      type="date"
                      fullWidth
                      error={Boolean(errors.birthday)}
                      helperText={
                        Boolean(errors.birthday) && errors.birthday.message
                      }
                      {...register("birthday")}
                    ></TextField>

                    <TextField
                      label="Giới tính"
                      fullWidth
                      error={Boolean(errors.gender)}
                      helperText={
                        Boolean(errors.gender) && errors.gender.message
                      }
                      {...register("gender")}
                    ></TextField>

                    <LoadingButton
                      variant="contained"
                      fullWidth
                      type="submit"
                      size="large"
                      loading={isPending}
                      style={{
                        backgroundColor: "#ff385c",
                        border: "1px solid #ff385c",
                      }}
                    >
                      Đăng ký
                    </LoadingButton>
                  </Stack>
                </form>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* </Container> */}
    </>
  );
};

export default SignUp;
