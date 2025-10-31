interface SpacerProps {
  size?: "sm" | "md" | "lg" | "xl"
}

const Spacer = ({ size = "md" }: SpacerProps) => {
  const sizeClasses = {
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
  }

  return <div className={sizeClasses[size]} />
}

export default Spacer
