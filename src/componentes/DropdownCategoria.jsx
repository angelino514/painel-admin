import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown } from "lucide-react"


export default function DropdownCategoria({ filtercatgory }) {

   const [aberto, setAberto] = useState(false)
   const navegacao = useNavigate()

   return (
      <div className="dropdown-categoria">
         <div
            type="button"
            className="dropdown-button"
            onClick={() => setAberto(!aberto)}
         >
            <span>Categoria</span>
            <ChevronDown />
         </div>

         {aberto && (
            <div className="dropdown-menu">

               {['todas', ...filtercatgory].map((categoria) => (
                  <div
                     key={categoria}
                     type="button"
                     className="dropdown-item"
                     onClick={() => {
                        navegacao(
                           `/admin/Produtos/Resultado/categoria/${categoria}`
                        )

                        setAberto(false)
                     }}
                  >
                     {categoria}
                  </div>
               ))}

            </div>
         )}

      </div>
   )
}