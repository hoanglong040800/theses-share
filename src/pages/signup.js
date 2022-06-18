import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Box, Button } from "@material-ui/core";
import AlertSnackbarCustom from "common/components/AlertSnackbarCustom";
import TextFieldController from "common/components/input/TextFieldController";
import { snackbarCaseMessages } from "common/utils/constants";
import { signupSchema } from "common/utils/validation-schema";
import { fetchSignup } from "modules/auth/fetch-auth";
import { getSession, signIn } from "next-auth/client";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      apiUrl: process.env.API_URL,
      nextauthUrl: process.env.NEXTAUTH_URL,
    },
  };
}

export default function SignUp({ apiUrl, nextauthUrl }) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {},
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    action: "",
    severity: "",
    message: "",
  });

  function handleCloseSnackbar() {
    setOpenSnackbar(false);

    if (snackbarProps.severity === "success") {
      signIn("credentials", {
        email: watch("email"),
        password: watch("password"),
        redirect: true,
        callbackUrl: `${nextauthUrl}/settings/edit-profile`,
      });
    }
  }

  async function onSubmit(data) {
    const res = await fetchSignup(apiUrl, data);

    res.status
      ? setSnackbarProps(snackbarCaseMessages.signupSuccess)
      : res.message.includes("duplicate")
      ? setSnackbarProps(snackbarCaseMessages.signupDuplicate)
      : setSnackbarProps(snackbarCaseMessages.signupError);

    setOpenSnackbar(true);
  }

  function onError(error) {
    console.log("ERROR", error);
  }

  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <h1>Đăng ký</h1>

        <TextFieldController
          name="email"
          label="Email (đăng nhập)"
          required
          type="email"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="user_name"
          label="Username (hiển thị)"
          required
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password"
          label="Mật khẩu"
          required
          type="password"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="password_confirmation"
          label="Xác nhận mật khẩu"
          required
          type="password"
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Đăng ký
          </Button>
        </Box>
      </Box>

      <AlertSnackbarCustom
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </>
  );
}
