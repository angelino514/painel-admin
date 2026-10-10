import { useState } from 'react';
import ErrorMessagem from './ErroMensagem';
import Loading from './Loading';
import Sucesso from './Sucesso';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';



export default function ConfirmarEmail() {
   const [codigo, setCodigo] = useState('');


   const navigation = useNavigate()

   const [mensagen, setMensagen] = useState(false)
   const [typeMensagen, setTypeMensagen] = useState(false)
   const [mensagemShow, setMensagemShow] = useState('')

   const [erro, setErro] = useState('')
   const [existeErro, setExisteErro] = useState(false)
   const [loading, setIloading] = useState(false)


   const handleChange = (e) => {
      setCodigo(e.target.value)
      setExisteErro(false)
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!/^\d*$/.test(codigo) && !codigo.length <= 6) {
         setErro('Valor Inválido')
         setExisteErro(true)
         return
      }


      if (codigo === '') {
         setErro('Este campo não pode ficar vazio')
         setExisteErro(true)
         return
      }


      setIloading(true)
      const formdata = new FormData()
      formdata.append('codigo', codigo)

      try {

         const resposta = await fetch('https://banck-end.vercel.app/confirmarcodigo', {
            method: 'POST',
            body: formdata,
            credentials: 'include'
         })

         const informacoes = await resposta.json()
         if (informacoes.erro === true) {
            setIloading(false)
            setExisteErro(true)
            setErro(informacoes.mensagem)
            return
         }

         if (informacoes.erro === false) {
            setMensagen(true)
            setTypeMensagen(true)
            setMensagemShow(informacoes.mensagem)
            setIloading(false)
            setErro(informacoes.mensagem)

            setTimeout(() => { navigation('/') }, 4000)
         }

      } catch (erro) {
         setMensagen(true)
         setTypeMensagen(false)
         setMensagemShow('Verifique a sua conexão com a internet')
         return
      }
   }

   async function newCodigo() {

      setIloading(true)

      try {
         const resposta = await fetch('https://banck-end.vercel.app/novocodigo', {
            method: 'POST',
            credentials: 'include'
         })

         const informacoes = await resposta.json()
         if (resposta.status === 200) {
            setMensagen(true)
            setTypeMensagen(true)
            setMensagemShow(informacoes.mensagem)

            setTimeout(() => { setMensagen(false) }, 4000)
         }

         if (resposta.status === 400) {
            setMensagen(true)
            setTypeMensagen(false)
            setMensagemShow(informacoes.mensagem)
         }

      } catch (erro) {
         setMensagen(true)
         setTypeMensagen(false)
         setMensagemShow('Verifique a sua conexão com a internet')

      } finally {
         setIloading(false)
      }
   }

   return (
      <>

         {loading && <Loading />}

         {mensagen && (
            <section className='section-mensagen-email'>
               {typeMensagen ?
                  <motion.div
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{
                        duration: 0.4,
                        ease: "easeOut"
                     }}
                  >
                     <Sucesso mensgem={mensagemShow} />
                  </motion.div>

                  :
                  <motion.div
                     initial={{ scale: 0.5, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{
                        duration: 0.4,
                        ease: "easeOut"
                     }}
                  >
                     <ErrorMessagem mensagem={mensagemShow} />
                  </motion.div>

               }
            </section>
         )}

         <section>
            <motion.div
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ mduration: 0.4, ease: "easeOut" }}>


               {/* Lado direito com o conteúdo totalmente centralizado */}
               <div className="container-main-email">
                  <div className="face">
                     <div className="register-form-wrapper confirm-email-wrapper">

                        {existeErro && (<ErrorMessagem mensagem={erro} />)}

                        <h2>Confirmar Email</h2>

                        <p className="confirm-subtitle">
                           Enviámos um código de confirmação para o seu email.
                           Introduza-o abaixo para ativar a sua conta. Atenção:
                           o código tem duração de 1min e 20s.
                        </p>

                        <form onSubmit={handleSubmit} noValidate>

                           {/* Campo Código de Confirmação */}
                           <div className="register-input-group">

                              <input
                                 type="text"
                                 name="codigo"
                                 inputMode="numeric"
                                 placeholder="Insira o código"
                                 value={codigo}
                                 onChange={handleChange}
                                 maxLength={6}
                              />
                              <i className="fa-solid fa-shield-halved register-icon"></i>
                           </div>

                           {/* Botão Confirmar */}
                           <button
                              type="submit"
                              className="register-submit-btn"
                           >
                              Enviar Código
                           </button>

                        </form>

                        {/* Rodapé do formulário */}
                        <div className="register-form-footer">
                           <p>
                              Não recebeu o código? <button className='new-codigo' type='button'
                                 onClick={() => {
                                    newCodigo()
                                 }}>Reenviar</button>
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </section>
      </>
   )

}