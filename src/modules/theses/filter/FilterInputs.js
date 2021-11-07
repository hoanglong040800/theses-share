import { Box, Button, Grid, makeStyles, MenuItem } from '@material-ui/core'
import SelectController from 'common/components/input/SelectController'
import TextFieldController from 'common/components/input/TextFieldController'
import { useForm } from 'react-hook-form'

export default function FilterInputs({
  defaultValues,
  allFaculties,
  allTags,
  onFilter,
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
    defaultValues: {
      name: '',
      faculty: defaultValues.faculty || '',
      published_year: defaultValues.published_year || '',
      tag: defaultValues.tag || '',
    },
  })
  const mui = useStyles()

  function onSubmit(data) {
    data.faculty === 'none' ? (data.faculty = '') : null

    console.log(data.faculty)

    for (let key in data) {
      data[key] === '' ? delete data[key] : null
    }

    console.log({ data })

    onFilter(data)
  }

  function handleReset() {
    const resetValues = {
      name: '',
      faculty: '',
      published_year: '',
      tag: '',
    }

    reset(resetValues)
  }

  return (
    <div className={mui.paper}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <TextFieldController
            name="name"
            label="Tên luận văn"
            control={control}
            errors={errors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SelectController
            name="faculty"
            label="Khoa"
            control={control}
            errors={errors}
          >
            {allFaculties.map(item => (
              <MenuItem key={item.id} value={item.name_short_vn}>
                {item.name_vn}
              </MenuItem>
            ))}
          </SelectController>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SelectController
            name="published_year"
            label="Năm"
            control={control}
            errors={errors}
          >
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2017}>2017</MenuItem>
            <MenuItem value={2016}>2016</MenuItem>
            <MenuItem value={2015}>2015</MenuItem>
          </SelectController>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <SelectController
            name="tag"
            label="Tag"
            control={control}
            errors={errors}
          >
            {allTags.map(item => (
              <MenuItem key={item.id} value={item.name_short_en}>
                {item.name_vn}
              </MenuItem>
            ))}
          </SelectController>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
        <Button size="small" onClick={handleReset} className={mui.resetBtn}>
          Reset
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit(onSubmit)}
        >
          Filter
        </Button>
      </Box>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: [theme.spacing(0, 3, 3, 3)],
    margin: [theme.spacing(3, 0)],
    boxShadow: [theme.shadows[2]],
    borderRadius: [theme.shape.borderRadius],
  },

  resetBtn: {
    marginRight: [theme.spacing(1)],
  },
}))
