import { BrowserRouter } from "react-router-dom"
import { Container } from "./styles"
import ScrollAnimation from "react-animate-on-scroll"
import { NavHashLink } from "react-router-hash-link"
import { hero } from "../../data"

const profileImageUrl = "https://lh3.googleusercontent.com/JZY0oViJsH5xUfCSkRucFoyBoXrsvqrq-aTb57360UiNtMU5YZploGmqmWdh-19ypmzB8OfibCgKTAYtvKz3BiUcz14vMNXXLuypQvmBrxDc5zs8uvOLoVXbw9QH8Txlt-wteZeoOA4PAzTtMGMxhCv4lNZs95vCaNDU49j_BR0Rmaz0cTageEydZ9Ligk-0aa-ceXDc4MjTciTF2FIzwHe38GQm8vIvKZhNZQAEb8HrrBUCwdTdDfuHNi-orkRhD1-wwSJw1Jhlkp6Gm1jf6RQta9iDaPsoADqLXgVnCk00N-0uUjpbayNdSGj-AN0tZKvABNBNsbFE8wP8tie_U6bwL0H3IHwrSdBDmW_kjEAT6GfNHDsP08OOzmqiODoME7-FFoofINVhcdGTXsCMfu1M7ngBVcNevFuzevuVINK-CqXJ4HlZaEbkPS_P8YVkZTEwCkP4iu0KUtQ1qZiqrqClYN7u8SDzEXW0BMjgSrFSZSSLl-EXGMBaCZnErI6HosmHNkUh3MJoLyh-J6p8GrRGM1WQONPesyVObK5C0cJ7-U9TX7U_Ku4xRtFJyog7CenstUjYZyFmPVkItG57kNBLbQLNiOtm1sKDHYu-fKmsYHK26sNR-AN_M4b2ZAywPmkA7WBO0CktGlJGmrTlAzWtza_EdBLWKFqUMejuzUeb95pRvlw7j16uLAGeQzKMzvVdz8nlcJvO28DC188GuH5j1g=s704-no?authuser=0";

export function Hero(){
  return(
    <Container id="home">
      <div className="hero-text">
        <ScrollAnimation animateIn="fadeInUp">
          <p>{hero.hello}</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.2*1000}>
          <h1>{hero.name}</h1>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
          <h3>{hero.title}</h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.6 * 1000}>
          <p className="small-resume">{hero.smallResume} </p>
        </ScrollAnimation>

          <ScrollAnimation animateIn="fadeInUp" delay={0.8*1000}>
            <BrowserRouter>
              <NavHashLink smooth to="#contacts" className="button">{hero.contacts}</NavHashLink>
            </BrowserRouter>
          </ScrollAnimation>
      </div>
      <div className="hero-image">
        <ScrollAnimation animateIn="fadeInRight" delay={1*1000}>
          <img src={profileImageUrl} alt="Profile picture"/>
        </ScrollAnimation>
      </div>
    </Container>
  )
}