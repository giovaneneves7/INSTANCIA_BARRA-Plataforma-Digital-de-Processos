import { FloatingWhatsApp } from 'react-floating-whatsapp'
import logoPrefeitura from "../assets/logo_prefeitura_with_background.png"

/*
* @author Giovane Neves
*/ 
export default function WhatsappFloatingButton(){

    return (
        <FloatingWhatsApp
                  phoneNumber="+557436413116"
                  avatar={logoPrefeitura}
                  accountName="Prefeitura de Irecê"
                  chatMessage="Olá! Como podemos te ajudar?"
                  placeholder="Digite sua mensagem..."
                  onClick={() => {
                    window.open("https://wa.me/557436413116?text=Olá!%20Gostaria%20de%20mais%20informações.", "_blank");
                  }}
                />
    );

}
