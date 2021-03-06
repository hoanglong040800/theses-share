import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Box, Button, MenuItem, Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AutocompleteController from "common/components/input/AutocompleteController";
import SelectController from "common/components/input/SelectController";
import TextAreaController from "common/components/input/TextAreaController";
import TextFieldController from "common/components/input/TextFieldController";
import { thesisSchema } from "common/utils/validation-schema";
import { fetchAllFaculties, fetchAllTags } from "modules/fetch-common";
import {
  addFile,
  addFileAI,
  addThesisInfor,
  fetchNewestTheses,
} from "modules/theses/fetch-theses";
import UploadPDF from "modules/theses/pdf/UploadPDF";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  const tagsOptions = await fetchAllTags(process.env.NEXT_PUBLIC_API_URL);
  const facultiesOptions = await fetchAllFaculties(
    process.env.NEXT_PUBLIC_API_URL
  );

  if (tagsOptions === false || facultiesOptions === false) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tagsOptions,
      session,
      facultiesOptions,
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
  };
}

export default function NewThesis({
  apiUrl,
  session,
  tagsOptions,
  facultiesOptions,
}) {
  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(thesisSchema),
    defaultValues: {
      format: "PDF",
    },
  });

  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [openProcessSnackbar, setOpenProcessSnackbar] = useState(false);

  function handleCloseProcessSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpenProcessSnackbar(false);
  }

  // Snackbar
  function handleCloseSnackbar() {
    setOpenSnackbar(false);

    if (severity === "success") {
      const slug = slugify(watch("name"));
      // const nameEmail = getNameFromEmail(session.user.email);

      reset("", {
        keepValues: false,
      });
      router.push(`/${session.user.user_name}/${slug}`);
    }
  }

  async function onSubmit(data) {
    setLoading(true);
    setOpenProcessSnackbar(true);
    data["slug"] = slugify(data["name"]);
    data["id"] = JSON.parse(localStorage.getItem("max_id")) + 1;
    // add infor
    const thesis_id = await addThesisInfor(apiUrl, data, session.user.id);
    if (!thesis_id) {
      setSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    // add file
    const status =
      data["tags"] === undefined || data["tags"].length === 0
        ? await addFileAI(apiUrl, data.file[0], session.user.id, thesis_id)
        : await addFile(apiUrl, data.file[0], session.user.id, thesis_id);

    console.log(status);

    if (status) {
      setSeverity("success");
      JSON.stringify(localStorage.setItem("max_id", data["id"]));
    } else setSeverity("error");

    setOpenSnackbar(true);
    setLoading(false);
  }

  function onError(err) {
    console.log("ERROR\n", err);
  }

  return (
    <>
      <Head>
        <title>Th??m lu???n v??n m???i</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <UploadPDF name="file" register={register} errors={errors} />

        <TextFieldController
          name="name"
          label="T??n lu???n v??n"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="faculty_id"
          label="Khoa"
          required
          control={control}
          errors={errors}
        >
          {facultiesOptions.slice(1).map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name_vn}
            </MenuItem>
          ))}
        </SelectController>

        <TextFieldController
          name="published_year"
          label="N??m"
          type="number"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          label="Lo???i lu???n v??n"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KLTN">Kh??a lu???n t???t nghi???p</MenuItem>
          <MenuItem value="??ACN">????? ??n chuy??n ng??nh</MenuItem>
        </SelectController>

        <Box mt={2}>
          <AutocompleteController
            name="tags"
            label="Tags"
            options={tagsOptions}
            optionLabel="name_vn"
            control={control}
            errors={errors}
            setValue={setValue}
          />
        </Box>

        <SelectController
          name="format"
          label="?????nh d???ng"
          control={control}
          errors={errors}
        >
          <MenuItem value="PDF">PDF</MenuItem>
        </SelectController>

        <SelectController
          name="language"
          label="Ng??n ng???"
          control={control}
          errors={errors}
        >
          <MenuItem value="VN">Ti???ng Vi???t</MenuItem>
          <MenuItem value="EN">Ti???ng Anh</MenuItem>
        </SelectController>

        <TextFieldController
          name="authors"
          label="T??c gi???"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="teachers"
          label="Gi???ng vi??n h?????ng d???n"
          control={control}
          errors={errors}
        />

        <TextAreaController
          name="abstract"
          label="T???ng quan"
          control={control}
          errors={errors}
        />

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            ????ng
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={2500}
        TransitionComponent={Slide}
      >
        <Alert onClose={handleCloseSnackbar} severity={severity}>
          {severity === "success"
            ? "Th??m lu???n v??n th??nh c??ng. ??ang ??i???u h?????ng ?????n trang chi ti???t"
            : "C?? l???i x???y ra khi th??m lu???n v??n m???i. Vui l??ng th??? l???i l???n sau."}
        </Alert>
      </Snackbar>
      <Snackbar
        color="warning"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openProcessSnackbar}
        autoHideDuration={5000}
        TransitionComponent={Slide}
        onClose={handleCloseProcessSnackbar}
      >
        <Alert onClose={handleCloseProcessSnackbar} severity="info">
          Lu???n v??n c???a b???n ??ang ???????c x??? l??. Vui l??ng ch??? trong gi??y l??t nh?? ^^
        </Alert>
      </Snackbar>
    </>
  );
}

NewThesis.auth = true;
