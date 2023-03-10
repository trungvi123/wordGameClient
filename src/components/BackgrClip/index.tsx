import { anBa,anhTrang,aoThuat,saMac,yogi,anime1,anime2,bg2D,bg3D } from "../../assets/video_bg"
import './BackgrClip.css'

interface IProps {
  indexBg:number
}

function BackgrClip(props:IProps) {
  const {indexBg} = props
  
  const arrClip = [yogi,anBa,anhTrang,aoThuat,saMac,anime1,anime2,bg2D,bg3D]

    return (
    <div>
        <video src={arrClip[indexBg]} autoPlay muted loop className="video-bg"></video>
    </div>
  )
}

export default BackgrClip