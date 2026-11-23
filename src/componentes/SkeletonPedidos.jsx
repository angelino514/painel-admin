
import '../styles/SkeletonPedidos.css';

export default function SkeletonPedidos() {

  return (
    <aside className="listPedidos skeleton-pedidos">
      {[1, 2, 3].map((item) => (
        <article key={item} className="container-lt-pd">

          <div className="inf-all-status">
            <span className="skeleton sk-status"></span>
            <span className="skeleton sk-status"></span>
          </div>

          <div className="content-lt-pd">

            <div className="skeleton sk-img"></div>

            <div className="inf-all-pd">
              <span className="skeleton sk-text sk-data"></span>
              <span className="skeleton sk-text sk-quantidade"></span>
              <span className="skeleton sk-text sk-variacao"></span>
            </div>

            <div className="inf-all-values">
              <span className="skeleton sk-text sk-preco"></span>
              <span className="skeleton sk-text sk-total"></span>
              <span className="skeleton sk-button"></span>
            </div>

          </div>
        </article>
      ))}
    </aside>
  );
}
