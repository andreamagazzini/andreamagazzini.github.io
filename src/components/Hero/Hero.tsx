import ScrollAnimation from "react-animate-on-scroll"
import { About } from "../About/About"

export const hero = {
  hello: "Hello 👋, I'm",
  name: "Andrea Magazzini",
  title: "Professional Software Engineer",
  smallResume: "Dynamic, open minded and fast learner",
  contacts: "Contacts",
}

const profileImageUrl = "https://lh3.googleusercontent.com/JZY0oViJsH5xUfCSkRucFoyBoXrsvqrq-aTb57360UiNtMU5YZploGmqmWdh-19ypmzB8OfibCgKTAYtvKz3BiUcz14vMNXXLuypQvmBrxDc5zs8uvOLoVXbw9QH8Txlt-wteZeoOA4PAzTtMGMxhCv4lNZs95vCaNDU49j_BR0Rmaz0cTageEydZ9Ligk-0aa-ceXDc4MjTciTF2FIzwHe38GQm8vIvKZhNZQAEb8HrrBUCwdTdDfuHNi-orkRhD1-wwSJw1Jhlkp6Gm1jf6RQta9iDaPsoADqLXgVnCk00N-0uUjpbayNdSGj-AN0tZKvABNBNsbFE8wP8tie_U6bwL0H3IHwrSdBDmW_kjEAT6GfNHDsP08OOzmqiODoME7-FFoofINVhcdGTXsCMfu1M7ngBVcNevFuzevuVINK-CqXJ4HlZaEbkPS_P8YVkZTEwCkP4iu0KUtQ1qZiqrqClYN7u8SDzEXW0BMjgSrFSZSSLl-EXGMBaCZnErI6HosmHNkUh3MJoLyh-J6p8GrRGM1WQONPesyVObK5C0cJ7-U9TX7U_Ku4xRtFJyog7CenstUjYZyFmPVkItG57kNBLbQLNiOtm1sKDHYu-fKmsYHK26sNR-AN_M4b2ZAywPmkA7WBO0CktGlJGmrTlAzWtza_EdBLWKFqUMejuzUeb95pRvlw7j16uLAGeQzKMzvVdz8nlcJvO28DC188GuH5j1g=s704-no?authuser=0";

export const Hero = () => {
  return (
    <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-x-10 lg:space-y-0">
        <img className="object-none object-[47%_30%] h-52 w-52 rounded-lg" src={profileImageUrl} alt="Profile pic" />
        <div>
        <ScrollAnimation animateIn="fadeInUp">
          <p className="text-3xl">{hero.hello}</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <h1 className="text-7xl">{hero.name}</h1>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <h3 className="my-3 text-green-500">{hero.title}</h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
          <p className="text-3xl mb-8">{hero.smallResume} </p>
        </ScrollAnimation>
        </div>
        </div>
      
        <About />
    </div>
  )
}