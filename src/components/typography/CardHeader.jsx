export default function CardHeader({text,color='dark-blue'}) {
    const textColorClass=`text-${color}`

  return (
    <div>
        <h1 className={`${textColorClass} text-[20px] font-bold  font-montserrat`}>{text}</h1>
    </div>
  )
}
