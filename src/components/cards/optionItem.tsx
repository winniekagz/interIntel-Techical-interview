import Button from '@components/buttons/Button'
import { OptionProps } from '@pages/AddProductOption'


interface optionItemProps extends OptionProps{
handleEdit:()=>void
}

export default function OptionItem({option_name ,option_values,handleEdit}:optionItemProps) {
  return (
    <div className='flex justify-between py-4  border-b border-gray px-5 w-full bg-white'>
        <div className="">
            <p className='text-dark-blue text-[18px] font-bold'>{option_name}</p>
            <div className="flex flex-row gap-4">
            {option_values.map((value)=>(
                
                  <div className='bg-gray text-dark-blue rounded-large px-3 py-1 rounded-lg'>{value}</div>
                
            ))}
            </div>
        </div>
        <div className="">
            <Button handleClick={handleEdit} text='Edit'/>
        </div>
    </div>
  )
}
