import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { getIdFromArrObj } from 'common/utils/util'
import { Controller } from 'react-hook-form'

export default function AutocompleteController({
  name,
  control,
  errors,
  setValue,
  options = [],
  getOptionLabel,
  label = '',
  defaultValue = [],
  required = false,
  limitTags = 5,
}) {
  function handleOnChange(value) {
    setValue(name, getIdFromArrObj(value))
  }

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Autocomplete
          options={options}
          getOptionLabel={getOptionLabel}
          getOptionSelected={(option, value) => option.id === value.id}
          defaultValue={defaultValue}
          limitTags={limitTags}
          noOptionsText="Không có dữ liệu"
          multiple
          onChange={(e, value) => handleOnChange(value)}
          renderInput={params => (
            <TextField
              label={label}
              required={required}
              error={!!errors[name]}
              helperText={errors[name]?.message}
              {...params}
            />
          )}
        />
      )}
    />
  )
}
