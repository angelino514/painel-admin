import { useState } from 'react';
import ErrorMessagem from './ErroMensagem';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { NavLink } from 'react-router-dom';

export default function Registrar() {

  const navegacao = useNavigate()

  const [erro, setErro] = useState('')
  const [existeErro, setExisteErro] = useState(false)
  const [loading, setIloading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const nome = formData.nome.trim()
  const sobrenome = formData.sobrenome.trim()
  const email = formData.email.trim()
  const senha = formData.senha
  const confirmarSenha = formData.confirmarSenha

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (nome === '' || sobrenome === '' || email === ''
      || senha === '' || confirmarSenha === '') {
      setExisteErro(true)
      setErro('Preencha todos os campos')
      return
    }

    const regexEmail = /^[^\s@]+@gmail\.com$/
    if (!regexEmail.test(email)) {
      setExisteErro(true)
      setErro('email Inválido')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setExisteErro(true)
      setErro('Senhas diferentes')
      return
    }

    setIloading(true)
    setExisteErro(false)

    const form = new FormData()
    form.append('nome', nome)
    form.append('sobrenome', sobrenome)
    form.append('email', email)
    form.append('senha', senha)

    try {
      const reposta = await fetch('https://banck-end.vercel.app/novousuario', {
        method: 'POST',
        body: form,
        credentials: 'include'
      })

      const sucesso = await reposta.json()
      if (sucesso.erro === true) {
        setIloading(false)
        setErro(sucesso.mensagem)
        setExisteErro(true)
      }

      if (sucesso.erro === false) {
        navegacao('/ConfirmarEmail')
      }

    } catch (erro) {
      setIloading(false)
      setErro('Falha ao registrar tente novamente')
      setExisteErro(true)
      console.log(erro)
    }

    formData.nome = ''
    formData.sobrenome = ''
    formData.email = ''
    formData.senha = ''
    formData.confirmarSenha = ''
  }

  return (
    <div className="register-container-main">

      {loading && (<Loading />)}

      {/* Lado esquerdo com fundo escuro */}
      <div className="register-left-side">
        <div className="register-left-content">
          <h1>Bem Vindo!</h1>
          <p>Voce pode controlar a sua loja 100% remoto com esse sistema de gestao</p>
          <button className="register-outline-btn">Loja Online</button>
        </div>
      </div>

      {/* Lado direito com o formulário */}
      <div className="register-right-side">
        <div className="register-form-wrapper">
          <h2>Criar Conta</h2>

          {existeErro && (<ErrorMessagem mensagem={erro} />)}

          <form onSubmit={handleSubmit} noValidate>
            {/* Campo Nome */}
            <div className="register-input-group">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={formData.nome}
                onChange={handleChange}
              />
              <i className="fa-solid fa-user register-icon"></i>
            </div>

            {/* Campo Sobrenome */}
            <div className="register-input-group">
              <input
                type="text"
                name="sobrenome"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
              />
              <i className="fa-solid fa-user register-icon"></i>
            </div>

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
                type="password"
                name="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
              />
              <i className="fa-solid fa-eye-slash register-icon"></i>
            </div>

            {/* Campo Confirmação de Senha */}
            <div className="register-input-group">
              <input
                type="password"
                name="confirmarSenha"
                placeholder="Confirmar Senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
              />
              <i className="fa-solid fa-eye-slash register-icon"></i>
            </div>

            <div>
              <input type="checkbox" />
            </div>

            {/* Botão Entrar */}
            <button type="submit" className="register-submit-btn"> Enviar </button>
          </form>

          {/* Rodapé do formulário */}
          <div className="register-form-footer">
            <p>Já tenho uma conta {<NavLink to={'/'}> Entrar </NavLink>}</p>
          </div>
        </div>
      </div>
    </div>
  )
}