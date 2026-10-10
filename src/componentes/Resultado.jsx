import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";


export default function Resultado() {

   const navegacao = useNavigate()

   const { valor, accao } = useParams();
   const [products, setProductcs] = useState([])

   async function searchProdutos(valor) {
      try {
         const res = await fetch(`https://banck-end.vercel.app/buscar/${encodeURIComponent(accao)}/${encodeURIComponent(valor)}`, {
            credentials: 'include'
         });

         if (!res.ok) {
            throw new Error("Erro ao buscar produtos");
         }

         const dados = await res.json();
         setProductcs(dados)

         if (dados.autenticacao === false) {
            navegacao('/')
            return
         }


      } catch (erro) {
         console.error(erro);
      }
   }

   useEffect(() => {
      if (valor?.trim() !== '') {
         searchProdutos(valor);
      }
   }, [valor]);

   return (
      <>
         <ProductList product={products} />
      </>
   )
}


