import { useEffect, useState } from 'react'
import {
  Menu, X, CreditCard,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  Package
} from 'lucide-react'

import '../styles/Pedidos.css'
import { useOutletContext } from 'react-router-dom'
import SkeletonPedidos from './SkeletonPedidos'

export function Pedidos() {

  const [lista, setLista] = useState([])
  const [openInf, setOpenInf] = useState(false)
  const [infCl, setInfCl] = useState({})
  const { setMenuActivo } = useOutletContext()
  const [loading, setLoading] = useState(true)

  async function pedidosAdm() {
    setLoading(true)
    try {
      const res = await fetch('https://banck-end.vercel.app/adiminPedidos', {
        method: 'POST',
        credentials: 'include'
      })

      const data = await res.json()
      setLista(data.pedidos)

    } catch (erro) {
      return
    } finally {
      setLoading(false)
    }
  } 

  useEffect(() => { pedidosAdm() }, [])

  function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  function formatarPreco(valor) {
    return Number(valor).toLocaleString('pt-PT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  function InfCliente({ user }) {
    return (
      <div className='container-inf-cl'>
        <div className="face">

          <button className='btn-all-closed-cl'
            onClick={() => {
              setOpenInf(false)
            }}
          > <X size={25} /> </button>

          <div className="">
            <p> Nome : {user.nome + ' ' + user.sobrenome}</p>
            <p> Email : {user.email}</p>
            <p> Telefone :{user.telefone}</p>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>

      {openInf && <InfCliente user={infCl} />}

      <header className='header-pedidos'>
        <aside className='face-contaner-hd-pd'>

          <div className="face">
            <div className="ct-pd-title">
              <h2 className='h2-pd-title'> Pedidos </h2>
            </div>
            <button className='btn-closed-mn-pd'
              onClick={() => { setMenuActivo(true) }}
            > <Menu /></button>
          </div>
        </aside>
      </header>

      <section className="pedidos-section">
        <div className="face-pedidos">

          {!loading ?
            <aside className='listPedidos'>
              {lista?.map((item, index) => (
                <article key={index} className='container-lt-pd'>

                  <div className="inf-all-status">

                    {item.pagamento === 1 ?
                      <span className='all-status stutus-true'>
                        <CheckCircle2 size={20} />
                        Pagamento concluído
                      </span> : <span className='all-status stutus-false'>
                        <Clock size={20} />
                        Pagamento pendente
                      </span>}

                    {!item.pendente === 1 ?
                      <span className='all-status stutus-true'>
                        <PackageCheck size={20} />
                        Entrega concluída
                      </span> :
                      <span className='all-status stutus-false'>
                        <Truck size={20} />
                        Entrega pendente
                      </span>}
                  </div>

                  <div className='content-lt-pd'>
                    <img src={`https://banck-end.vercel.app/imagens/${item.produto_id}`} alt={item.produto_id} />
                    <div className='inf-all-pd'>
                      <p>Data do pedido: {formatarData(item.data_pedido)}</p>
                      <p> quantidade {item.quantidade}</p>
                      <p>
                        {item.variacoes.especificacao_valor}
                        {item.variacoes.outra_especificacao_valor !== null &&
                          <span>
                            /{item.variacoes.outra_especificacao_valor}
                          </span>}
                      </p>
                    </div>

                    <div className="inf-all-values">
                      <p>Preço: {formatarPreco(item.preco)} Kz</p>
                      <p>Total: {formatarPreco(item.total)} Kz</p>

                      <button onClick={() => {
                        setInfCl(item)
                        setOpenInf(true)
                      }}> Cliente </button>
                    </div>

                  </div>
                </article>
              ))}
            </aside>
            : <SkeletonPedidos />
          }

        </div>
      </section>
    </>
  )
}