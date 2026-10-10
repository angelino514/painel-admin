import { X, ImagePlus, VaultIcon, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import { motion } from "framer-motion"
import Sucesso from './Sucesso';
import ErrorMessagem from './ErroMensagem';
import SkeletonProductEdit from './SkeletonProductEdit';


export default function ProductEdit() {

   const { id } = useParams()
   const navigation = useNavigate()

   const [mensagen, setMensagen] = useState(false)
   const [typeMensagen, setTypeMensagen] = useState(false)
   const [mensagemShow, setMensagemShow] = useState('')
   const [loading, setLoading] = useState(false)
   const [loadingProduct, setLoadingProduct] = useState(true);

   const [imagens, setImagens] = useState([])

   const [especificacoes, setEspecificacoes] = useState([])
   const [valueEsp, setValueEsp] = useState('')
   const [valueOther, setValueOther] = useState('')

   const [name, setName] = useState('')
   const [description, setDescription] = useState('')
   const [price, setPrice] = useState('')
   const [category, setCategory] = useState('')
   const [stock, setStock] = useState('')

   const [promotion, setPromotion] = useState('')
   const [openPromotion, setOpenPromotion] = useState(false)
   const [otherespecificacoes, setOtherespecificacoes] = useState([])

   const [currentValues, setCurrentValues] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      promotion: '',
   })

   const categories = [
      'Eletrônicos',
      'Informática',
      'Celulares',
      'Acessórios',
      'Roupas',
      'Calçados',
      'Casa e Jardim',
      'Beleza',
      'Esportes',
      'Brinquedos',
      'Livros',
      'Alimentos',
      'Automóveis',
      'Outros'
   ]

   const [openCategory, setOpenCategory] = useState(false)

   async function edit(id) {
      try {

         const res = await fetch(`https://banck-end.vercel.app/buscareditar/${id}`, {
            credentials: 'include'
         })

         const information = await res.json()
         if (information.autenticacao === false) {

            setMensagen(true)
            setTypeMensagen(false)
            setMensagemShow(information.mensagem)

            setTimeout(() => {
               navigation('/')
            }, 5000)
            return
         }

         const values = {
            name: information[0]?.nome || '',
            description: information[0]?.descricao || '',
            price: information[0]?.preco || '',
            category: information[0]?.categoria || '',
            stock: information[0]?.stock || '',
            promotion: information[0]?.promocao || ''
         }

         setCurrentValues(values)

         setName(values.name)
         setDescription(values.description)
         setPrice(values.price)
         setCategory(values.category)
         setStock(values.stock)
         setPromotion(values.promotion)


         setEspecificacoes(
            information[0].esp?.map(p => ({
               id: p.id,
               product_id: p.produto_id,
               valor: p.valor,
            })) ?? []
         )

         setOtherespecificacoes(
            information[0].outEsp?.map(p => ({
               id: p.id,
               product_id: p.produto_id,
               valor: p.valor,
            })) ?? []
         )

         setImagens(
            information[0].imagens?.map((p) => ({
               id: p.id,
               product_id: p.produto_id,
               url: `https://banck-end.vercel.app/imagem/${p.id}`,
               file: null,
               action: 'olders'
            })) ?? []
         )

      } catch (e) {
         return
      } finally {
         setLoadingProduct(false);
      }

   }

   useEffect(() => { edit(id) }, [id])

   function addImagens(event) {
      const files = Array.from(event.target.files)

      const newImagens = files.map((file) => ({
         id: null,
         product_id: id,
         url: URL.createObjectURL(file),
         file: file,
         action: 'new'
      }))

      setImagens(prev => [
         ...prev,
         ...newImagens
      ])
      event.target.value = ''
   }


   function hadlegange(e) {
      setValueEsp(e.target.value);
   }


   function eventKeydwon(e) {
      if (e.key === 'Enter') {
         e.preventDefault()
         addNewEspe()
      }
   }

   function addNewEspe() {

      if (valueEsp.trim() === '') {
         return
      }
      const existe = especificacoes.some(p =>
         p.valor.toLowerCase() === valueEsp.toLowerCase()
      )
      if (existe) return
      setEspecificacoes((prev) => {
         return [...prev, {
            id: null,
            product_id: null,
            valor: valueEsp,
         }]
      })
      setValueEsp('')

   }

   function otherhadlegange(e) {
      setValueOther(e.target.value);
   }

   function otheraddNewEspe() {
      if (valueOther.trim() === '') return
      const existe = otherespecificacoes.some(
         p => p.valor.toLowerCase() === valueOther.toLowerCase()
      )
      if (existe) return

      setOtherespecificacoes(prev => [
         ...prev,
         {
            id: null,
            product_id: null,
            valor: valueOther.trim()
         }
      ])
      setValueOther('')
   }

   function othereventKeydwon(e) {
      if (e.key === 'Enter') {
         e.preventDefault()
         otheraddNewEspe()
      }
   }

   function removeImage(index) {
      setImagens(prev =>
         prev.filter((_, i) => i !== index)
      )
   }

   function removeEspecificacao(index) {
      setEspecificacoes(prev =>
         prev.filter((_, i) => i !== index)
      )
   }

   function removeotherespecificacoes(index) {
      setOtherespecificacoes(prev =>
         prev.filter((_, i) => i !== index)
      )
   }

   async function onEdit(e) {

      e.preventDefault()
      if (!name.trim() || !description.trim() || stock === '' || price === ''
         || imagens.length === 0 || especificacoes.length === 0 || otherespecificacoes.length === 0
      ) {

         setMensagen(true)
         setTypeMensagen(false)
         setMensagemShow('Preencha todos os campos obrigatórios.')
         return
      }

      setLoading(true)

      const sendAlter = new FormData()
      sendAlter.append('name', name)
      sendAlter.append('description', description)
      sendAlter.append('stock', stock)
      sendAlter.append('price', price)

      const existingImages = imagens.filter(img => img.id !== null).map(img => img.id)
      sendAlter.append('existingImages', JSON.stringify(existingImages))
      imagens.forEach(img => {
         if (img.file instanceof File) {
            sendAlter.append('imagens', img.file)
         }
      })

      sendAlter.append('especificacoes', JSON.stringify(especificacoes))
      sendAlter.append('otherespecificacoes', JSON.stringify(otherespecificacoes))

      try {
         const res = await fetch(`https://banck-end.vercel.app/editarprodutos/${id}`, {
            method: 'PUT',
            credentials: 'include',
            body: sendAlter
         })

         const inf = await res.json()
         if (inf.autenticacao === false) {
            setMensagen(true)
            setTypeMensagen(false)
            setMensagemShow(inf.mensagem)
            setTimeout(() => { navigation('/') }, 4000)
            return
         }

         if (inf.erro === true) {
            setMensagen(true)
            setTypeMensagen(false)
            setMensagemShow(inf.mensagem)

            setTimeout(() => { setMensagen(false) }, 4000)
            return
         }

         if (inf.erro === false) {
            setMensagen(true)
            setTypeMensagen(true)
            setMensagemShow(inf.mensagem)
            setTimeout(() => { setMensagen(false) }, 4000)
         }

      } catch (erro) {
         return
      } finally {
         setLoading(false)
      }

      setName('')
      setStock('')
      setPrice('')
      setDescription('')
      setImagens([])
      setEspecificacoes([])
      setOtherespecificacoes([])
   }

   return (
      <>
         {loading && <Loading />}

         {mensagen && (
            <section className='section-mensagen'>
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

         {loadingProduct ? (<SkeletonProductEdit />) : (<section className='section-all-new'>
            <div className="admin-form-container face">

               <div className="admin-form-header">
                  <h2>Editar Produto</h2>
                  <p>Edite detalhes, variações (tamanhos e cores) e imagens do produto.</p>
               </div>

               <form className='admin-product-form' onSubmit={onEdit}>
                  <div className="form-grid">

                     {/* Coluna da Esquerda - Dados Básicos e Especificações */}
                     <div className="form-main-fields">
                        <div className="form-group">
                           <label htmlFor="name">Nome do Produto *</label>
                           <input type="text" id="name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              onBlur={(e) => {
                                 if (e.target.value.trim() === '') {
                                    setName(currentValues.name);
                                 }
                              }}
                           />

                        </div>

                        <div className="form-row">

                           <div className="form-group">
                              <label htmlFor="category">Categoria</label>

                              <div
                                 id="category"
                                 className="catego"
                                 onClick={() => setOpenCategory(prev => !prev)}
                              >
                                 <div className="category-selected">
                                    <span>{category || currentValues.category}</span>

                                    <ChevronDown
                                       size={18}
                                       className={openCategory ? 'rotate' : ''}
                                    />
                                 </div>

                                 {openCategory && (
                                    <div className="category-options">
                                       {categories.map((p) => (
                                          <button
                                             type="button"
                                             key={p}
                                             onClick={(e) => {
                                                e.stopPropagation()
                                                setCategory(p)
                                                setOpenCategory(false)
                                             }}
                                          >
                                             {p}
                                          </button>
                                       ))}
                                    </div>
                                 )}
                              </div>

                           </div>

                           <div className="form-group">
                              <label>Promoção</label>

                              <div
                                 className="catego"
                                 onClick={() => setOpenPromotion(prev => !prev)}
                              >
                                 <div className="category-selected">
                                    <span>{promotion || currentValues.promotion}</span>

                                    <ChevronDown
                                       size={18}
                                       className={openPromotion ? 'rotate' : ''}
                                    />
                                 </div>

                                 {openPromotion && (
                                    <div className="category-options">
                                       {['Sim', 'Não'].map((p) => (
                                          <button
                                             type="button"
                                             key={p}
                                             onClick={(e) => {
                                                e.stopPropagation()
                                                setPromotion(p)
                                                setOpenPromotion(false)
                                             }}
                                          >
                                             {p}
                                          </button>
                                       ))}
                                    </div>
                                 )}
                              </div>
                           </div>

                        </div>

                        <div className="form-row">
                           <div className="form-group">
                              <label htmlFor="price">Preço (kz) *</label>
                              <input type="number" id="price" name="price"
                                 value={price}
                                 onChange={(e) => {
                                    const valuePrice = e.target.value
                                    if (valuePrice === '' || Number(valuePrice) <= 0) {
                                       return
                                    }
                                    setPrice(valuePrice)
                                 }}
                                 onBlur={(e) => {
                                    if (e.target.value.trim() === '') {
                                       setPrice(currentValues.price);
                                    }
                                 }}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="stock">Estoque *</label>
                              <input
                                 type="number"
                                 id="stock"
                                 name="stock"
                                 min="0"
                                 value={stock}
                                 onChange={(e) => {
                                    const valueStock = e.target.value;
                                    if (valueStock === '' || Number(valueStock) >= 0) {
                                       setStock(valueStock);
                                    }
                                 }}
                                 onBlur={() => {
                                    if (stock.trim() === '') {
                                       setStock(currentValues.stock);
                                    }
                                 }}
                              />
                           </div>
                        </div>

                        {/* SEÇÃO: Adicionar Tamanhos (Outras Especificações) */}
                        <div className="form-group">
                           <label>Tamanhos Disponíveis</label>
                           <div className="tag-input-container">
                              <input type="text" value={valueEsp}
                                 onChange={hadlegange}
                                 onKeyDown={eventKeydwon}
                                 placeholder='Ex: P, M, G, 40, 42... (Pressione Enter)' />
                              <button type="button" className="btn-add-tag"
                                 onClick={() => { addNewEspe() }}>
                                 Adicionar</button>
                           </div>

                           <div className="tags-list">
                              {especificacoes.map((esp, index) => (
                                 <span className="tag-badge" key={index}>
                                    {esp.valor}
                                    <button type="button" onClick={() => {
                                       removeEspecificacao(index)
                                    }}>×</button>
                                 </span>
                              ))}
                           </div>
                        </div>

                        {/* SEÇÃO: Adicionar Cores (Outras Especificações) */}
                        <div className="form-group">
                           <label>Cores Disponíveis</label>
                           <div className="tag-input-container">
                              <input type="text"
                                 onChange={otherhadlegange}
                                 onKeyDown={othereventKeydwon}
                                 value={valueOther}
                                 placeholder="Ex: Azul, Vermelho, Preto... (Pressione Enter)"
                              />
                              <button type="button" className="btn-add-tag"
                                 onClick={() => { otheraddNewEspe() }}
                              >Adicionar</button>
                           </div>
                           <div className="tags-list">
                              {otherespecificacoes.map((esp, index) => (
                                 <span className="tag-badge color-tag" key={index}>
                                    {esp.valor}
                                    <button type="button"
                                       onClick={() => {
                                          removeotherespecificacoes(index)
                                       }}
                                    >×</button>
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="form-group">
                           <label htmlFor="description">Descrição</label>
                           <textarea id="description" name="description" rows="10"
                              value={description}
                              onChange={(e) => {
                                 const valueDescription = e.target.value
                                 if (valueDescription.trim() === '') {
                                    return
                                 }
                                 setDescription(valueDescription)
                              }}

                              onBlur={(e) => {
                                 if (e.target.value.trim() === '') {
                                    setDescription(currentValues.description)
                                 }
                              }}
                           ></textarea>
                        </div>
                     </div>

                     {/* Coluna da Direita - Gerenciador de Imagens */}
                     <div className="form-images-section">
                        <label>Imagens do Produto *</label>

                        <div className='image-upload-dropzone'>
                           <input
                              type="file"
                              id="images"
                              multiple
                              accept="image/*"
                              className="file-input-hidden"
                              onChange={addImagens}
                           />
                           <label htmlFor="images" className="upload-label">
                              <span className="upload-icon"> <ImagePlus size={40} /> </span>
                              <span className="upload-text">Clique para adicionar</span>
                              <span className="upload-subtext">ou arraste e solte</span>
                           </label>
                        </div>


                        <div className="image-preview-grid">
                           {imagens.slice(0, 5).map((imagen, index) => (
                              <div className="image-preview-item" key={index}>
                                 <img
                                    src={imagen.url}
                                    alt={`Imagem ${index + 1}`}
                                 />

                                 <button
                                    type="button"
                                    className="btn-remove-image"
                                    onClick={() => {
                                       removeImage(index)
                                    }}
                                 >
                                    <X />
                                 </button>
                              </div>
                           ))}
                        </div>

                     </div>

                  </div>

                  {/* Botões de Ação */}
                  <div className="form-actions">
                     <button type="button" className="btn-secondary">Cancelar</button>
                     <button type="submit" className="btn-primary">Salvar Produto</button>
                  </div>
               </form>

            </div >
         </section >)}
      </>
   )
}