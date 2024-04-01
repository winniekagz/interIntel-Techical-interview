import { Controller } from 'react-hook-form';
import Autocomplete from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemContent from '@mui/joy/ListItemContent';
import { ReactSVG } from 'react-svg';
import { FormFieldError } from '@utils/hook-form/FormFieldError'; 
import { arrowDownIcon } from '@assets/index';

export type Option = {
  label: string|undefined;
  value: string|undefined;
}

interface Props {
  name: string;
  options: Option[];
  control?: any;
  placeholder? : string
  label?  : string
  disabled?: boolean;
}

export default function CustomAutocomplete({ name, options, control, placeholder, label, disabled }: Props) {
  const error = FormFieldError({ name: name })!=null
  return (
    <div className='flex-col w-full'>
      <label className="text-dark-gray text-[16px] font-[600] capitalize">{label}</label>
      <Controller
        control={control}
        name={name}
        // defaultValue={null}
        render={({ field : { onChange, value} }) => {
          const optionValue = options?.find((option) => option?.value === value)
          return(
            <Autocomplete
              id={`${name}-select-input`}
              isOptionEqualToValue={(option, value) => option?.value === value?.value}
              slotProps={{
                input: {
                  autoComplete: 'new-password',
                  outline: 'none',
                },
              }}
              disabled={disabled}
              popupIcon={<ReactSVG src={arrowDownIcon} />}
              sx={{ width: '100%', height: '48px', bgcolor: 'inherit', '--Input-focusedHighlight': 'black', '--Input-focusedBorder': 'black', '--Input-radius': '8px' }}
              options={options}
              autoHighlight
              className={`mt-2 border ${error?'!border-red-500':'border-gray-300'} bg-inherit text-gray-900 text-sm rounded-[13px] w-full focus:ring-black focus:border-black focus:outline-none shadow shadow-gray-300 block  p-2.5  h-[48px]`}
              placeholder={placeholder}
              onChange={(_, newValue ) => {
                onChange(newValue?.value);
              }}
              value={optionValue || null}
              getOptionLabel={(option) => option.label?option?.label:''}
              renderOption={(props, option) => (
                <AutocompleteOption {...props} key={option.value}>
                  <ListItemContent sx={{ fontSize: 'sm' }}>{option?.label}</ListItemContent>
                </AutocompleteOption>
              )}
            />

          )}}
      />
      <FormFieldError name={name} />
    </div>
  );
}
