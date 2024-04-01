import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetOptionDetails } from '../features/variant/variantSlice';
import ProductCard from '../components/cards/ProductCard';
import { productData } from '../components/productsData';
import HeaderText from '../components/typography/HeaderText';

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleVariant = async() => {
    await resetVariants();
   await navigate("/variant");

  };
  async function resetVariants() {
    await dispatch(resetOptionDetails()); 
  }

   useEffect(() => {
     resetVariants();
   }, []);

  return (
    <div className="flex-col justify-center items-center h-[100vh] bg-light-blue-bg">
          <div className="flex justify-center m-8">
      <HeaderText  text=" A list of all created products"/>
     </div>
 
    <div className=" flex-col flex-1 grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-8  h-full py-16 px-7">
      {productData?.map((product)=>(
      <ProductCard key={product?.id} image={product?.image} handleClick={handleVariant} title={product?.title} price={product?.price} id={product?.id} description={product.description.substring(0,80)+'...'}/>
      ))}
    </div>
      <Button className="!bg-dark-blue !text-white px-2 py-4" onClick={handleVariant}>
        Continue to variants page
      </Button>
    </div>
  );
}

export default Landing