import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import LoaderProducts from "./LoaderProducts";

export default function Resultado() {
   const navegacao = useNavigate();
   const { valor, accao } = useParams();

   const [loading, setLoading] = useState(true);
   const [products, setProducts] = useState([]);

   async function searchProdutos(valor) {
      setLoading(true);

      try {
         const res = await fetch(
            `https://banck-end.vercel.app/buscar/${encodeURIComponent(accao)}/${encodeURIComponent(valor)}`,
            { credentials: "include" }
         );

         if (!res.ok) {
            throw new Error("Erro ao buscar produtos");
         }

         const dados = await res.json();

         if (dados.autenticacao === false) {
            navegacao("/");
            return;
         }

         setProducts(dados);
      } catch (erro) {
         return
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      if (valor?.trim()) {
         searchProdutos(valor);
      } else {
         setProducts([]);
         setLoading(false);
      }
   }, [valor, accao]);

   if (loading) {
      return <LoaderProducts />;
   }

   return <ProductList product={products} />;
}