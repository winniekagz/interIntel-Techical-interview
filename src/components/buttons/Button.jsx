import { ReactSVG } from 'react-svg';


export default function Button({ text, icon, handleClick,isOutlined ,type}) {

  return (
    <button type={type?type:'submit'}
      onClick={() => handleClick()}
      className={`${isOutlined?'bg-light-blue-bg text-dark-blue border border-dark-blue hover:g-dark-blue hover:text-light-blue-bg':'bg-dark-blue text-light-blue-bg hover:bg-light-blue-bg border hover:border-dark-blue hover:text-dark-blue'}   px-4 py-2 text-[14px] rounded flex gap-2 items-center border `}
    >
      {icon ? <ReactSVG src={icon} className='h-[16px] w-[16px]' /> : null}
      {text}
    </button>
  );
}
