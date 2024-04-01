import { viewIcon } from "../../assets";
import BodyText from "../typography/BodyText";
import CardHeader from "../typography/CardHeader";
import HeaderText from "../typography/HeaderText";
import Button from "../buttons/Button";


export default function ProductCard({title,image,price,description,handleClick}) {

   
  return (
    <div className='bg-light-blue-bg rounded-[8px] p-4 w-full h-[730px] '>
        <img src={image} alt="product"  className='mb-2 w-full '  />
        <div className="flex flex-col gap-4">
        <CardHeader text={title}/>
        <BodyText text={description}/>
        <HeaderText text={'Kes'+ ' '+ price}/>
        </div>
        <div className="float-right">
            <Button
             text='Add options' icon ={viewIcon} handleClick={handleClick}/>
        </div>
    </div>
  )
}
