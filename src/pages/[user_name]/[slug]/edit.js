import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Box, Button, MenuItem, Slide, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AutocompleteController from "common/components/input/AutocompleteController";
import SelectController from "common/components/input/SelectController";
import TextAreaController from "common/components/input/TextAreaController";
import TextFieldController from "common/components/input/TextFieldController";
import { editThesisSchema } from "common/utils/validation-schema";
import { fetchAllFaculties, fetchAllTags } from "modules/fetch-common";
import {
  fetchThesisBySlug,
  updateThesisInfor,
} from "modules/theses/fetch-theses";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  // --- handle routing error ----

  // check is [email] match with user
  if (ctx.params.user_name !== session.user.user_name)
    return {
      notFound: true,
    };

  const details = await fetchThesisBySlug(
    process.env.NEXT_PUBLIC_API_URL,
    ctx.params.slug
  );

  if (!details)
    return {
      notFound: true,
    };
  // check is thesis belong to user
  else if (session.user.id !== details.user.id)
    return {
      notFound: true,
    };

  const tagsOptions = await fetchAllTags(process.env.NEXT_PUBLIC_API_URL);
  const facultiesOptions = await fetchAllFaculties(
    process.env.NEXT_PUBLIC_API_URL
  );

  if (!facultiesOptions || !tagsOptions)
    return {
      notFound: true,
    };

  return {
    props: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
      session,
      details,
      facultiesOptions,
      tagsOptions,
    },
  };
}

export default function EditThesis({
  apiUrl,
  session,
  details,
  facultiesOptions,
  tagsOptions,
}) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [severity, setSeverity] = useState("success");
  const router = useRouter();

  const {
    watch,
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(editThesisSchema),
    defaultValues: {
      name: details.name,
      faculty_id: details.faculty.id,
      published_year: details.published_year,
      tags: details.tags, // must update UI by set defaultValue for Autocomplete
      type: details.type,
      language: details.language,
      format: details.format,
      authors: details.authors,
      teachers: details.teachers,
      abstract: details.abstract,
    },
  });

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
    data["slug"] = slugify(data["name"]);

    const status = await updateThesisInfor(
      apiUrl,
      data,
      session.user.id,
      details.id
    );

    status ? setSeverity("success") : setSeverity("error");
    setOpenSnackbar(true);
  }

  function onError(err) {
    console.log("ERROR\n", err);
  }

  return (
    <>
      <Head>
        <title>Ch???nh s???a lu???n v??n</title>
      </Head>

      <h1>Ch???nh s???a lu???n v??n</h1>

      <Box display="flex" flexDirection="column" mx="auto" maxWidth="500px">
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
          {facultiesOptions.map((item) => (
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
            defaultValue={details.tags}
            required
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
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit, onError)}
          >
            Ch???nh s???a
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
            ? "Ch???nh s???a lu???n v??n th??nh c??ng. ??ang ??i???u h?????ng ?????n trang chi ti???t"
            : "C?? l???i x???y ra khi ch???nh s???a. Vui l??ng th??? l???i l???n sau."}
        </Alert>
      </Snackbar>
    </>
  );
}

EditThesis.auth = true;
