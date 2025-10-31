import logoCidadeInteligente from '../assets/logo_cidadeInteligente.png'
import { InstagramLogo, FacebookLogo, YoutubeLogo, MapPin, LinkedinLogo, TiktokLogo} from "@phosphor-icons/react";

export function Footer(){
     return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 pmpdba@presidentedutra.ba.gov.br</p>
              <p>📞 (74) 3640-1010</p>
              <p>📍  Av. São Gabriel, 226 - Centro, Pres. Dutra - BA, 44930-000</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="http://portaldatransparencia.com.br/prefeitura/presidentedutra/" className="hover:text-white transition-colors">
                  Portal da Transparência
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Guia de Utilização do SEI
                </a>
              </li>
              <li>
                <a href="http://www.presidentedutra.ba.gov.br/home" className="hover:text-white transition-colors">
                  Portal da Prefeitura
                </a>
              </li>
            
            </ul>
          </div>

          {/* About */}
           <div className='w-full f'>
                    <figure>
                        <a href="https://cidadesinteligentes.ifba.edu.br/"><img src={logoCidadeInteligente} alt="Logo Cidade Inteligente" className='w-[150px] md:w-[200px]' /></a>
                    </figure>
                </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Prefeitura Municipal. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;