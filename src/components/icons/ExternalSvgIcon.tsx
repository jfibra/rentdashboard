interface ExternalSvgIconProps {
    url: string
    alt: string
}

export const ExternalSvgIcon = ({ url, alt }: ExternalSvgIconProps) => {
    return (
        <div className="external-svg-icon">
            <img src={url || "/placeholder.svg"} alt={alt} width="48" height="48" />
        </div>
    )
}
