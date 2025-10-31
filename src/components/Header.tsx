import type React from "react"
import logoPrefeitura from "../assets/logoPrefeitura.jpg"
import { useNavigate } from "react-router-dom"
import { LogOut, ShieldUser, UserCheck } from "lucide-react";
import {  useEffect, useState } from "react";
import { supabase } from "../api/SupabaseClient";


const ADMIN_EMAIL = "admin.pdp@irece.ba.gov.br";

const Header: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(()=> {
    const checUser = async () => {
      const {data: {user} }  = await supabase.auth.getUser();
      if(user?.email === ADMIN_EMAIL){
        setIsAdmin(true);
      }
    }
  
    checUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setShowMenu(false);
    navigate("/login")
  }

  // const handleClick = () => {
  //   navigate(isAdmin ? "/dashboard" : "/login");
  //     }
  return (
    <header className="w-full bg-gradient-to-r from-green-900 to-green-800 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Botão de login do administrador */}
        <div className="absolute top-14 right-8">
          {isAdmin ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="bg-white hover:bg-gray-700 hover:text-white text-black font-semibold py-2 px-4 rounded shadow flex items-center"
              >
                <UserCheck className="mr-2" />
                ADMIN
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-white hover:bg-green-200 hover:text-black text-black font-semibold py-2 px-4 rounded shadow flex items-center"
              onClick={() => navigate("/login")}
            >
              <ShieldUser className="mr-2" />
              ENTRAR
            </button>
          )}
        </div>

        <div className="flex items-center justify-center py-6 sm:py-8">
          <div className="flex items-center space-x-6">
           <div className="bg-white rounded-full shadow-md w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center overflow-hidden">
            <img
              src={logoPrefeitura || "/placeholder.svg"}
              alt="Logo da Prefeitura"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

            <div className="text-center">
              <h1 className="text-white font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                Plataforma Digital de Processos
              </h1>
              <p className="text-blue-100 text-sm sm:text-base md:text-lg font-inter mt-1">
                Processos Municipais
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
