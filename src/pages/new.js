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
        <title>Thêm luận văn mới</title>
      </Head>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
        <UploadPDF name="file" register={register} errors={errors} />

        <TextFieldController
          name="name"
          label="Tên luận văn"
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
          label="Năm"
          type="number"
          required
          control={control}
          errors={errors}
        />

        <SelectController
          name="type"
          label="Loại luận văn"
          required
          control={control}
          errors={errors}
        >
          <MenuItem value="KLTN">Khóa luận tốt nghiệp</MenuItem>
          <MenuItem value="ĐACN">Đồ án chuyên ngành</MenuItem>
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
          label="Định dạng"
          control={control}
          errors={errors}
        >
          <MenuItem value="PDF">PDF</MenuItem>
        </SelectController>

        <SelectController
          name="language"
          label="Ngôn ngữ"
          control={control}
          errors={errors}
        >
          <MenuItem value="VN">Tiếng Việt</MenuItem>
          <MenuItem value="EN">Tiếng Anh</MenuItem>
        </SelectController>

        <TextFieldController
          name="authors"
          label="Tác giả"
          control={control}
          errors={errors}
        />

        <TextFieldController
          name="teachers"
          label="Giảng viên hướng dẫn"
          control={control}
          errors={errors}
        />

        <TextAreaController
          name="abstract"
          label="Tổng quan"
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
            Đăng
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
            ? "Thêm luận văn thành công. Đang điều hướng đến trang chi tiết"
            : "Có lỗi xảy ra khi thêm luận văn mới. Vui lòng thử lại lần sau."}
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
          Luận văn của bạn đang được xử lý. Vui lòng chờ trong giây lát nhé ^^
        </Alert>
      </Snackbar>
    </>
  );
}

NewThesis.auth = true;
