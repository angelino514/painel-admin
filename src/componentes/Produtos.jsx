import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Menu, Search } from 'lucide-react'
import DropdownCategoria from "./DropdownCategoria"
import { useOutletContext } from "react-router-dom"

export default function Produtos() {

   const { setMenuActivo } = useOutletContext()
   const navegacao = useNavigate()
   const [filtercatgory, setfiltercatgory] = useState([])
   const [busca, setBusca] = useState('')

   async function buscarProdutos() {
      try {
         const resposta = await fetch('https://banck-end.vercel.app/produtosadmin', {
            method: 'GET',
            credentials: 'include'
         })

         const informacoes = await resposta.json()
         if (resposta.status === 401) {
            navegacao('/')
            return
         }

         const categorias = [...new Set(informacoes.map(produto => produto.categoria))]
         setfiltercatgory(categorias)

      } catch (erro) {
         return
      }
   }

   useEffect(() => {
      buscarProdutos()
   }, [])

   return (
      <>
         <header className="header-produto">
            <aside className="face">
               <div className="admin-header">
                  <div className="container-admin-one">
                     <div>
                        <h2>Gerenciamento de Produtos</h2>
                        <p>Visualize, filtre e gerencie o estoque da sua loja.</p>
                     </div>

                     <button className="btn-open-menu" onClick={() => {
                        setMenuActivo(true)
                     }}> <Menu /> </button>
                  </div>
                  <button className="btn-primary" onClick={() => {
                     navegacao('/admin/NovoProduto')
                  }}>
                     + Novo Produto
                  </button>
               </div>

               {/* Barra de Filtros e Pesquisa */}
               <div className="admin-filters">
                  <div className="search-box">
                     <span className="search-icon"> <Search size={20} /></span>
                     <input
                        type="text"
                        placeholder="Pesquisar por nome do produto..."
                        value={busca}
                        onChange={(e) => {
                           const valor = e.target.value
                           setBusca(valor)

                           if (valor.trim() !== '') {
                              navegacao(
                                 `/admin/Produtos/Resultado/busca/${encodeURIComponent(valor.trim())}`
                              )
                           } else {
                              navegacao('/admin/Produtos')
                           }
                        }}
                     />
                  </div>
                  <div className="filter-group">
                     <DropdownCategoria filtercatgory={filtercatgory} />
                  </div>
               </div>

            </aside>
         </header>

         <main>
            <Outlet />
         </main>
      </>
   )
}