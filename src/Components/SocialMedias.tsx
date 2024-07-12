import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function SocialMedias() {
  return (
    <div className="social-icons">
    <FontAwesomeIcon icon={faGoogle} className='social-icon'/>
    <FontAwesomeIcon icon={faFacebook} className='social-icon'/>
    <FontAwesomeIcon icon={faGithub} className='social-icon'/>
    <FontAwesomeIcon icon={faLinkedin} className='social-icon'/>
  </div>
  )
}
