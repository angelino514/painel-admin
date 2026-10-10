import { useEffect, useState } from 'react'
import Menu from '../componentes/Menu'
import LoadingAdimin from '../componentes/LoadingAdimin'
import { Outlet, useNavigate } from 'react-router-dom'


export default function Home() {

   const [adimin, setAdimin] = useState('')
   const [loading, setloading] = useState(true)
   const [menuActivo, setMenuActivo] = useState(false)


   const navegacao = useNavigate()

   async function permisao() {
      try {

         const resposta = await fetch('https://banck-end.vercel.app/admin', {
            method: "GET",
            credentials: 'include'
         })

         const informacoes = await resposta.json()
         if (informacoes.erro === false) {
            setloading(false)
            setAdimin(informacoes.adimin.nome)
         }

         if (informacoes.erro === true) {
            navegacao('/')
         }

      } catch (erro) {
         return
      }
   }

   useEffect(() => {
      permisao()
   }, [])

   return (
      <section>
         {loading ?
            (<LoadingAdimin />) :
            (<>
               <section>
                  {/* Menu */}
                  <Menu adimin={adimin} setMenuActivo={setMenuActivo} menuActivo={menuActivo} />

                  {/* Conteudo principal */}
                  <main>
                     <Outlet context={{ setMenuActivo }} />
                  </main>
               </section>
            </>)}
      </section>
   )
}