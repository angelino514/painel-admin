import { NavLink } from "react-router-dom"
import { X } from "lucide-react"

export default function Menu({ adimin, setMenuActivo, menuActivo }) {

   const listaMenu = [
      { iten: 'Novo produto', rota: '/admin/NovoProduto' },
      { iten: 'Produtos', rota: '/admin/Produtos' }
   ]

   return (
      <nav className={menuActivo ? 'container-menu container-menu-Activo' : 'container-menu'}>
         <div className="face">

            <div className="container-adimin">
               <h1 className="titulo-admin-all menu-titulo"> Olá {adimin}</h1>
               <button className="btn-mobile closer" onClick={() => {
                  setMenuActivo(false)
               }}> <X size={18} /> </button>
            </div>

            <div className="ul-list-menu">
               {listaMenu.map((iten, index) =>
               (<NavLink onClick={() => { setMenuActivo(false) }} className={({ isActive }) => isActive ? 'link-menu-li link-menu-li-activo' : 'link-menu-li'}
                  key={index} to={iten.rota}> <div className="face"> {iten.iten} </div></NavLink>)
               )}
            </div>
         </div>
      </nav>
   )
}