export default function BodyText({text,color='gray'}) {
    const textColorClass=`text-${color}`

  return (
    <div>
        <h1 className={`${textColorClass} text-[18px] font-normal  font-lato`}>{text}</h1>
    </div>
  )
}
