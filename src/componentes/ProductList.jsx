import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function ProductList({ product }) {

    const navegacao = useNavigate()

    const [filteredProducts, setFilteredProducts] = useState([])
    const [produtoId, setProdutoId] = useState(null)
    const [confirmRemove, setConfirmRemove] = useState(false)

    useEffect(() => {
        setFilteredProducts(product);
    }, [product]);



    async function handleDelete(id) {
        try {
            const res = await fetch(
                `https://banck-end.vercel.app/eliminar/${id}`,
                {
                    method: 'DELETE',
                    credentials: 'include'
                }
            );

            const dados = await res.json();

            if (!res.ok) {
                console.log(dados);
                return;
            }

            // Só remove a linha depois da confirmação do backend
            setFilteredProducts((atuais) =>
                atuais.filter((produto) => produto.id !== id)
            );

            setConfirmRemove(false);
            setProdutoId(null);

        } catch (err) {
            return
        }
    }

    return (

        <>
            <div className='main-div-list'>
                <div className="admin-product-container face">
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Categoria</th>
                                    <th>Preço</th>
                                    <th>Estoque</th>
                                    <th>Promoção</th>
                                    <th className="text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    <AnimatePresence initial={false}>
                                        {filteredProducts.map((product) => (
                                            <motion.tr
                                                key={product.id}
                                                layout
                                                initial={false}
                                                exit={{
                                                    opacity: 0,
                                                    x: -30,
                                                    transition: { duration: 0.25 }
                                                }}
                                            >
                                                <td>
                                                    <div className="product-info-cell">
                                                        <img
                                                            src={`https://banck-end.vercel.app/imagens/${product.id}`}
                                                            alt={product.nome}
                                                            className="product-thumb" />

                                                        <span className="product-name">
                                                            {product.nome}
                                                        </span>

                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge-category">
                                                        {product.categoria}
                                                    </span>
                                                </td>
                                                <td>
                                                    <strong>
                                                        {Number(product.preco).toFixed(2)}Kz
                                                    </strong>
                                                </td>
                                                <td>
                                                    <span className={product.stock === 0 ? 'text-danger' : ''}>
                                                        {product.stock} un.
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${product.promocao === 'sim'
                                                        ? 'status-active'
                                                        : 'status-inactive'
                                                        }`} >
                                                        {product.promocao}
                                                    </span>
                                                </td>

                                                <td className="text-right">

                                                    <div className="action-buttons">

                                                        <button
                                                            className="btn-icon edit"
                                                            title="Editar"
                                                            onClick={() => {
                                                                navegacao(`/admin/Produtos/ProductEdit/${product.id}`)
                                                            }}
                                                        >
                                                            <Pencil size={18} />
                                                        </button>

                                                        <button
                                                            className="btn-icon delete"
                                                            title="Excluir"
                                                            onClick={() => {
                                                                setConfirmRemove(true)
                                                                setProdutoId(product.id)
                                                            }}
                                                        >
                                                            <Trash2
                                                                className="delete"
                                                                size={18}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                ) : (<tr>
                                    <td colSpan="6"
                                        className="no-results"
                                    >
                                        Nenhum produto encontrado.
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="admin-pagination">
                        <div className="pagination-buttons">
                            <button disabled>
                                Anterior
                            </button>
                            <button className="active">
                                1
                            </button>
                            <button disabled>
                                Próxima
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {confirmRemove && (
                <div className="confirmacao-exclusao">
                    <div className="confirmacao-box">

                        <button
                            type="button"
                            className="btn-fechar"
                            onClick={() => {
                                setConfirmRemove(false)
                            }}
                        >
                            <X />
                        </button>

                        <div className="confirmacao-conteudo">
                            <h2>Eliminar produto?</h2>

                            <p>
                                Tem certeza de que deseja eliminar este produto?
                                Esta ação não poderá ser desfeita.
                            </p>

                            <div className="confirmacao-acoes">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setConfirmRemove(false)
                                    }}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        handleDelete(produtoId)
                                        setConfirmRemove(false)
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default ProductList;
