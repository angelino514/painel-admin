import './app.css'
import Home from './pages/Home'
import Registrar from './componentes/Registrar'
import ConfirmarEmail from './componentes/ConfirmarEmail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Entrar from './componentes/Entrar'
import Produtos from './componentes/Produtos'
import NovoProduto from './componentes/NovoProduto'
import Resultado from './componentes/Resultado'
import ResultadoIndex from './componentes/ResultadoIndex'
import ProductEdit from './componentes/ProductEdit'

export function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Entrar />} />
          <Route path='/admin' element={<Home />}>
            <Route index path='NovoProduto' element={<NovoProduto />} />

            <Route path='Produtos' element={<Produtos />}>
              <Route index element={<ResultadoIndex />} />
              <Route path="Resultado/:accao/:valor" element={<Resultado />} />
              <Route path="ProductEdit/:id" element={<ProductEdit />} />
            </Route>

          </Route>
          <Route path='/registrar' element={<Registrar />} />
          <Route path='/ConfirmarEmail' element={<ConfirmarEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
