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
    <div className="flex-col justify-center items-center h-[100vh] bg-white">
          <div className="flex justify-center m-8">
      <HeaderText  text=" Click on the add option button to add  product options"/>
     </div>
 
    <div className=" mx-7 flex-col md:w-[500px] flex  flex-1 justify-center">
      {productData?.map((product)=>(
      <ProductCard key={product?.id} image={product?.image} handleClick={handleVariant} title={product?.title} price={product?.price} id={product?.id} description={product.description.substring(0,80)+'...'}/>
      ))}
    </div>
      
    </div>
  );
}

export default Landing