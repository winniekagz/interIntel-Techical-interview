import Button from '@components/buttons/Button'
import BodyText from '@components/typography/BodyText'
import CardHeader from '@components/typography/CardHeader'
import HeaderText from '@components/typography/HeaderText'
import { productItemProps } from 'types/productItemProps'
import viewIcon from '@assets/icons/carbon_view.svg'
import { useNavigate } from 'react-router-dom'


export default function ProductCard({title,id,image,price,description}:productItemProps) {
    const navigate=useNavigate()
    const redirectPath=()=>{
        navigate(`/add-product-options/${id}`)
    }
  return (
    <div className='bg-white rounded-[8px] p-4 w-full '>
        <img src={image} alt="product"  className='mb-2 w-full '  />
        <div className="flex flex-col gap-4">
        <CardHeader text={title}/>
        <BodyText text={description}/>
        <HeaderText text={'Kes'+ ' '+ price}/>
        </div>
        <div className="float-right">
            <Button text='Add options' icon ={viewIcon} handleClick={redirectPath}/>
        </div>
    </div>
  )
}
