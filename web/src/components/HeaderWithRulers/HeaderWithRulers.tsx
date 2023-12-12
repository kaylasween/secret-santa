const HeaderWithRulers = ({
  className,
  heading,
}: {
  className?: string
  heading: string
}) => {
  return (
    <div
      className={`with-rulers font-condensed text-7xl uppercase ${className}`}
    >
      {heading}
    </div>
  )
}

export default HeaderWithRulers
