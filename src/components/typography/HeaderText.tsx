

export default function HeaderText({text,color='dark-blue'}:{text:string,color?:string}) {
    const textColorClass=`text-${color}`
    console.log('textColorClass',textColorClass)
  return (
    <div>
        <h1 className={`${textColorClass} text-[32px] font-bold hover:text-blue font-montserrat`}>{text}</h1>
    </div>
  )
}
