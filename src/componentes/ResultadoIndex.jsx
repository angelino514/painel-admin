import { useEffect, useState } from 'react';
import ProductList from './ProductList';
import LoaderProducts from './LoaderProducts';

export default function ResultadoIndex() {

   const [loading, setLoading] = useState(true)


   const [products, setProducts] = useState([]);
   async function searchProducts() {
      try {
         const resposta = await fetch('https://banck-end.vercel.app/produtosadmin', {
            method: 'GET',
            credentials: 'include'
         })

         if (!resposta.ok) {
            return
         }
         const dados = await resposta.json();

         if (dados) {
            setLoading(false)
            setProducts(dados);
         }

      } catch (erro) {
         return
      }
   }

   useEffect(() => {
      searchProducts();
   }, []);

   return (
      <>
         {loading ? (<LoaderProducts />) : (<ProductList product={products} />)}
      </>
   );
}
