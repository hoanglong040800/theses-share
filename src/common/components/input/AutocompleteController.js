import { Chip, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { getIdFromArrObj } from 'common/utils/util'
import { Controller } from 'react-hook-form'

export default function AutocompleteController({
  name,
  control,
  errors,
  setValue,
  label = '',
  options = [],
  optionLabel = 'id',
  defaultValue = [],
  required = false,
  limitTags = 5,
}) {
  function handleOnChange(value) {
    setValue(name, getIdFromArrObj(value), { shouldValidate: true })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <Autocomplete
          options={options}
          getOptionLabel={option => option[optionLabel]}
          getOptionSelected={(option, value) => option.id === value.id}
          noOptionsText="Không có dữ liệu"
          defaultValue={defaultValue}
          limitTags={limitTags}
          multiple
          onChange={(e, value) => handleOnChange(value)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                size="small"
                label={option[optionLabel]}
                {...getTagProps({ index })}
              />
            ))
          }
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
