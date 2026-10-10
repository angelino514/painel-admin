import { X, ImagePlus, Menu } from 'lucide-react';
import { useState } from 'react';
import Sucesso from './Sucesso';
import ErrorMessagem from './ErroMensagem';
import Loading from './Loading';
import { motion } from "framer-motion"
import { useOutletContext } from "react-router-dom"


export default function NovoProduto() {

   const { setMenuActivo } = useOutletContext()

   const category = [
      "Eletrônicos",
      "Informática",
      "Celulares",
      "Acessórios",
      "Roupas",
      "Calçados",
      "Casa e Decoração",
      "Eletrodomésticos",
      "Beleza e Cuidados Pessoais",
      "Esportes",
      "Brinquedos",
      "Livros",
      "Alimentos e Bebidas",
      "Automóveis",
      "Ferramentas",
      "Outros"
   ]

   // Estado do formulário
   const [formData, setFormData] = useState({
      name: '',
      category: category[0],
      price: '',
      stock: '',
      status: 'Sim',
      description: ''
   });

   const [mensagen, setMensagen] = useState(false)
   const [typeMensagen, setTypeMensagen] = useState(false)
   const [mensagemShow, setMensagemShow] = useState('')
   const [loading, setLoading] = useState(false)

   // Estados para gerenciar Tags (Tamanhos e Cores)
   const [sizes, setSizes] = useState([]);
   const [sizeInput, setSizeInput] = useState('');

   const [colors, setColors] = useState([]);
   const [colorInput, setColorInput] = useState('');

   // Estado das imagens
   const [productImages, setProductImages] = useState([]);
   const [errors, setErrors] = useState({});

   // Manipula inputs de texto padrão
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (errors[name]) setErrors({ ...errors, [name]: '' });
   };

   // Funções para gerenciar Tamanhos
   const handleAddSize = (e) => {
      if (e.key === 'Enter' || e.type === 'click') {
         e.preventDefault();
         if (sizeInput.trim() && !sizes.includes(sizeInput.trim())) {
            setSizes([...sizes, sizeInput.trim()]);
            setSizeInput('');
         }
      }
   };

   const handleRemoveSize = (sizeToRemove) => {
      setSizes(sizes.filter(size => size !== sizeToRemove));
   }

   // Funções para gerenciar Cores
   const handleAddColor = (e) => {
      if (e.key === 'Enter' || e.type === 'click') {
         e.preventDefault();
         if (colorInput.trim() && !colors.includes(colorInput.trim())) {
            setColors([...colors, colorInput.trim()]);
            setColorInput('');
         }
      }
   };

   const handleRemoveColor = (colorToRemove) => {
      setColors(colors.filter(color => color !== colorToRemove));
   };

   // Manipula seleção de arquivos de imagem
   const handleFileChange = (e) => {

      const file = e.target.files[0];

      if (!file) return;

      setProductImages(prev => [
         ...prev,
         file
      ].slice(0, 5));

   };

   function removeImage(indexToRemove) {
      setProductImages((previous) => {
         return previous.filter(
            (_, index) => index !== indexToRemove
         );
      });
   }

   // Envio do formulário
   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Nome obrigatório.';
      if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Preço inválido.';
      if (!formData.description.trim()) { newErrors.description = 'Descrição obrigatória.'; };
      if (productImages.length === 0) newErrors.images = 'Adicione pelo menos uma imagem.';

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {

         const informacoes = new FormData()
         informacoes.append('nome', formData.name)
         informacoes.append('preco', formData.price)
         informacoes.append('descricao', formData.description)
         informacoes.append('categoria', formData.category)
         informacoes.append('stock', formData.stock)
         informacoes.append('especificao', JSON.stringify(sizes))
         informacoes.append('especificao2', JSON.stringify(colors))
         informacoes.append('status', formData.status)

         productImages.forEach((imagem) => {
            informacoes.append("imagens", imagem)
         })

         setLoading(true)

         function removeValues() {
            setFormData({
               name: '',
               category: category[0],
               price: '',
               stock: '',
               status: 'Sim',
               description: ''
            })

            setColors([])
            setSizes([])
            setProductImages([])
            setSizeInput('')
            setColorInput('')
         }

         try {

            const res = await fetch('https://banck-end.vercel.app/adicionar', {
               method: 'POST',
               body: informacoes,
               credentials: 'include'
            })

            const dados = await res.json()
            if (res.ok && dados.erro === false) {
               setLoading(false)
               setMensagen(true)
               setTypeMensagen(true)
               setMensagemShow(dados.mensagem)
               setTimeout(() => { setMensagen(false) }, 5000)
               removeValues()
               return
            }

            if (res.ok && dados.erro === true) {
               setLoading(false)
               setMensagen(true)
               setTypeMensagen(false)
               setMensagemShow(dados.mensagem)
               setTimeout(() => { setMensagen(false) }, 2000)
               removeValues()
               return
            }


         } catch (err) {
            return
         }
      }
   }

   return (
      <>

         <section className='section-all-new'>

            <div className="face content-open-menu">
               <button className='btn-open-menu' onClick={() => {
                  setMenuActivo(true)
               }}>
                  <Menu />
               </button>
            </div>

            <div className="admin-form-container face">
               <div className="admin-form-header">
                  <h2>Adicionar Novo Produto</h2>
                  <p>Cadastre detalhes, variações (tamanhos e cores) e imagens do produto.</p>
               </div>

               <form onSubmit={handleSubmit} className="admin-product-form">
                  <div className="form-grid">

                     {/* Coluna da Esquerda - Dados Básicos e Especificações */}
                     <div className="form-main-fields">
                        <div className="form-group">
                           <label htmlFor="name">Nome do Produto *</label>
                           <input type="text" id="name" name="name" placeholder="Ex: Tênis Esportivo" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                           {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-row">

                           <div className="form-group">
                              <label htmlFor="category">Categoria</label>
                              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                                 {category.map(p => (
                                    <option key={p} value={p}> {p} </option>
                                 ))}
                              </select>
                           </div>
                           <div className="form-group">
                              <label htmlFor="status">Promoção</label>
                              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                                 <option>Sim</option>
                                 <option>Não</option>
                              </select>
                           </div>
                        </div>

                        <div className="form-row">
                           <div className="form-group">
                              <label htmlFor="price">Preço (Kz) *</label>
                              <input type="number" step="0.01" id="price" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} className={errors.price ? 'error' : ''} />
                              {errors.price && <span className="error-message">{errors.price}</span>}
                           </div>
                           <div className="form-group">
                              <label htmlFor="stock">Estoque *</label>
                              <input type="number" id="stock" name="stock" placeholder="0" value={formData.stock} onChange={handleChange} />
                           </div>
                        </div>

                        {/* SEÇÃO: Adicionar Tamanhos (Outras Especificações) */}
                        <div className="form-group">
                           <label>Tamanhos Disponíveis</label>
                           <div className="tag-input-container">
                              <input
                                 type="text"
                                 placeholder="Ex: P, M, G, 40, 42... (Pressione Enter)"
                                 value={sizeInput}
                                 onChange={(e) => setSizeInput(e.target.value)}
                                 onKeyDown={handleAddSize}
                              />
                              <button type="button" className="btn-add-tag" onClick={handleAddSize}>Adicionar</button>
                           </div>
                           <div className="tags-list">
                              {sizes.map((size, index) => (
                                 <span key={index} className="tag-badge">
                                    {size}
                                    <button type="button" onClick={() => handleRemoveSize(size)}>×</button>
                                 </span>
                              ))}
                           </div>
                        </div>

                        {/* SEÇÃO: Adicionar Cores (Outras Especificações) */}
                        <div className="form-group">
                           <label>Cores Disponíveis</label>
                           <div className="tag-input-container">
                              <input
                                 type="text"
                                 placeholder="Ex: Azul, Vermelho, Preto... (Pressione Enter)"
                                 value={colorInput}
                                 onChange={(e) => setColorInput(e.target.value)}
                                 onKeyDown={handleAddColor}
                              />
                              <button type="button" className="btn-add-tag" onClick={handleAddColor}>Adicionar</button>
                           </div>
                           <div className="tags-list">
                              {colors.map((color, index) => (
                                 <span key={index} className="tag-badge color-tag">
                                    {color}
                                    <button type="button" onClick={() => handleRemoveColor(color)}>×</button>
                                 </span>
                              ))}
                           </div>
                        </div>

                        <div className="form-group">
                           <label htmlFor="description">Descrição</label>
                           <textarea id="description" name="description" rows="3" placeholder="Detalhes gerais..." value={formData.description} onChange={handleChange}></textarea>
                           {errors.description && <span className="error-message">{errors.description}</span>}
                        </div>
                     </div>

                     {/* Coluna da Direita - Gerenciador de Imagens */}
                     <div className="form-images-section">
                        <label>Imagens do Produto *</label>

                        <div className={`image-upload-dropzone ${errors.images ? 'error' : ''}`}>
                           <input
                              type="file"
                              id="images"
                              multiple
                              accept="image/*"
                              onChange={handleFileChange}
                              className="file-input-hidden"
                           />
                           <label htmlFor="images" className="upload-label">
                              <span className="upload-icon"> <ImagePlus size={40} /> </span>
                              <span className="upload-text">Clique para adicionar</span>
                              <span className="upload-subtext">ou arraste e solte</span>
                           </label>
                        </div>
                        {errors.images && <span className="error-message">{errors.images}</span>}

                        <div className="image-preview-grid">
                           {productImages.map((file, index) => (
                              <div key={index} className="image-preview-item">
                                 <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Imagem ${index + 1}`}
                                 />
                                 <button type="button" className='btn-remove-image' onClick={() => {
                                    removeImage(index)
                                 }}> <X /> </button>
                              </div>
                           ))}
                        </div>
                        <small className="info-text">Primeira imagem será a capa. Máx. 5 imagens.</small>
                     </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="form-actions">
                     <button type="button" className="btn-secondary" onClick={() => { }}>Cancelar</button>
                     <button type="submit" className="btn-primary">Salvar Produto</button>
                  </div>
               </form>
            </div>
         </section>

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
      </>
   );
};

