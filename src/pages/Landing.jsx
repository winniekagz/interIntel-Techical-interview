import { Button } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetOptionDetails } from '../features/variant/variantSlice';

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
    <div className="flex justify-center items-center h-[100vh]">
      <Button className="!bg-dark-blue !text-white px-2 py-4" onClick={handleVariant}>
        Continue to variants page
      </Button>
    </div>
  );
}

export default Landing