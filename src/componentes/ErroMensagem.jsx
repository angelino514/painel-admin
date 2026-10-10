
export default function ErrorMessagem({ mensagem }) {
   if (!mensagem) return null

   return (
      <div className="erro-mensagem">
         <p>{mensagem}</p>
      </div>
   )
}