import { Container } from "./styles";
import emailIcon from "../../assets/email-icon.svg";
import phoneIcon from "../../assets/phone-icon.svg"
import { contacts } from "../../data";


export function Contact(){

  return(
    <Container id="contacts">
      <header>
        <h2>{contacts.title}</h2>
        <p>{contacts.subtitle}</p>
      </header>
      <div className="contacts">
        <div>
          <img src={emailIcon} alt="Email" />
          <a href="mailto:andreamaga4@gmail.com">andreamaga4@gmail.com</a>
        </div>
        <div>
          <img src={phoneIcon} alt="Phone" />
          <a href="tel:+41763721444">+41 76 372 14 44</a>
        </div>  
      </div>
    </Container>
  )
}