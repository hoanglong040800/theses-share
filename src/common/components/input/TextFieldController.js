import { FormControl, TextField } from '@material-ui/core'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'

export default function TextFieldController({
  name,
  label,
  control,
  errors,
  required = false,
  defaultValue = '',
  type = 'text',
}) {
  return (
    <FormControl margin="normal" required={required} fullWidth>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            type={type}
            error={!!errors[name]}
            helperText={errors[name]?.message}
          />
        )}
      />
    </FormControl>
  )
}
