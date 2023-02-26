import "./Heading.css"

interface IProps {
    title : string
}


function Heading(props:IProps) {
    const {title} = props
    return ( <div className="heading">
        {title}
    </div> );
}

export default Heading;