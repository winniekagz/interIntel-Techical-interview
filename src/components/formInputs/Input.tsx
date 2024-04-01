import { FormFieldError } from '@utils/hook-form/FormFieldError';
import { ComponentProps, forwardRef } from 'react'

interface InputProps extends ComponentProps<'input'> {
    label: string;
    type?: string;
    disabled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ label, type = 'text', disabled = false, ...props }, ref) {
  const error = FormFieldError({ name: props.name })==null
  return (
    <div className='w-full'>
      <div className='flex justify-start flex-col'>
        <label className='text-dark-gray text-[16px] font-[600] capitalize'>{label}</label>
        <input
          className={`mt-2 border ${!error?'border-red-500':'border-d7-gray'} bg-inherit ${disabled ? 'text-[#BBBBC8]' : 'text-black-1' } text-sm rounded-lg w-full focus:ring-black focus:border-black focus:outline-none shadow shadow-gray-300 block  p-2.5  h-[48px] !font-[400] !text-[16px] `}
          type={type}
          ref={ref}
          disabled={disabled}
          {...props}
        />

        <FormFieldError name={props.name} />
      </div>
    </div>
  )
})