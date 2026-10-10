import { useState } from 'react'
import ErrorMessagem from './ErroMensagem'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'



export default function Entrar() {

   const [erro, setErro] = useState('')
   const [existeErro, setExisteErro] = useState(false)
   const [loading, setIloading] = useState(false)
   const navegacao = useNavigate()

   const mensagem = {
      emailInvalido: 'Email Inválido',
      dadosVazio: 'Preencha Todos os campos'
   }

   const [showPass, setShowPasse] = useState(false)
   const [formData, setFormData] = useState({
      email: '',
      senha: ''
   });

   const handleChange = (e) => {
      setExisteErro(false)
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      const email = formData.email.trim();

      if (email === '' || formData.senha === '') {
         setExisteErro(true)
         setErro(mensagem['dadosVazio'])
         return
      }

      const regexEmail = /^[^\s@]+@gmail\.com$/
      if (!regexEmail.test(email)) {
         setExisteErro(true)
         setErro(mensagem['emailInvalido'])
         return
      }

      setIloading(true)

      const form = new FormData()
      form.append('email', email)
      form.append('senha', formData.senha)

      try {
         const resposta = await fetch('https://banck-end.vercel.app/entrar', {
            method: 'POST',
            body: form,
            credentials: 'include'
         })

         console.log('Status:', resposta.status);
         const dados = await resposta.json();
         console.log('Dados recebidos:', dados);

         if (dados.error === true) {
            setIloading(false)
            setExisteErro(true)
            setErro(dados.mensagem)
         }

         if (dados.error === false) {
            navegacao('/admin/NovoProduto')
         }

      } catch (erro) {
         console.log(erro)
      }
   }

   return (
      <div className="register-container-main">

         {loading && (<Loading />)}

         {/* Lado esquerdo com fundo escuro idêntico */}
         <div className="register-left-side">
            <div className="register-left-content">
               <h1>Bem-vindo!</h1>
               <p>Tenha o controle da sua loja em um só lugar. Gerencie produtos, estoque, preços e imagens de forma simples, rápida e segura — de onde estiver.</p>
               <h2> A sua gestão, sempre ao seu alcance. </h2>
               <button className="register-outline-btn">Loja Online</button>
            </div>
         </div>

         {/* Lado direito com o formulário de Entrar */}
         <div className="register-right-side">

            <div className="register-form-wrapper">
               <h2>Entrar</h2>

               {existeErro && (<ErrorMessagem mensagem={erro} />)}

               <form onSubmit={handleSubmit} noValidate>
                  {/* Campo Email */}
                  <div className="register-input-group">
                     <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                     />
                     <i className="fa-solid fa-envelope register-icon"></i>
                  </div>

                  {/* Campo Senha */}
                  <div className="register-input-group">
                     <input
                        type={showPass ? 'text' : 'password'}
                        name="senha"
                        placeholder="••••••"
                        value={formData.senha}
                        onChange={handleChange}
                     />
                     <i className="fa-solid fa-eye register-icon"></i>
                  </div>

                  <div className='container-checkbox-show-pass'>
                     <input type="checkbox" checked={showPass} onChange={(e) => {
                        setShowPasse(e.target.checked)
                     }} />
                     <p> Mostrar palavra-passe </p>
                  </div>

                  {/* Botão Entrar */}
                  <button type="submit" className="register-submit-btn">Entrar</button>
               </form>

               {/* Rodapé do formulário */}
               <div className="register-form-footer">
                  <p>Não Tenho uma conta <a href='#' onClick={() => {
                     navegacao('/Registrar')
                  }}> Registrar </a></p>
               </div>
            </div>

         </div>
      </div >
   )
}