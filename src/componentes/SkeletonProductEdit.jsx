export default function SkeletonProductEdit() {
  return (
    <section className="section-all-new">
      <div
        className="admin-form-container face"
        aria-label="A carregar dados do produto"
        aria-busy="true"
      >


        {/* Cabeçalho */}
        <div className="admin-form-header">
          <div className="skeleton skeleton-edt-title"> </div>
          <div className="skeleton skeleton-edt-text"> </div>
        </div>

        {/* Formulário */}
        <div className="form-grid">


          <div className="form-main-fields">
            <div className="container-skeleton-name">
              <p className="skeleton skeleton-edit-name"></p>
              <p className="skeleton skeleton-input-name"></p>
            </div>

            <div className="container-others-input">

              <div className="skeleton-itens-containers">
                <p className="skeleton skeleton-inpts-name"></p>
                <p className="skeleton skeleton-inputs-inputs"></p>
              </div>


              <div className="skeleton-itens-containers">
                <p className="skeleton skeleton-inpts-name"></p>
                <p className="skeleton skeleton-inputs-inputs"></p>
              </div>

              <div className="skeleton-itens-containers">
                <p className="skeleton skeleton-inpts-name"></p>
                <p className="skeleton skeleton-inputs-inputs"></p>
              </div>

              <div className="skeleton-itens-containers">
                <p className="skeleton skeleton-inpts-name"></p>
                <p className="skeleton skeleton-inputs-inputs"></p>
              </div>

            </div>


            <div className="container-especifi-edit">

              <div className="containers-especit-all">
                <p className="skeleton skeleton-especif-name"></p>

                <div className="skeleton-especif-main">
                  <p className="skeleton skeleton-especif-input"></p>
                  <p className="skeleton skeleton-especif-btnAdd"></p>
                </div>

                <div className="skeleton-tag-list-spans">
                  <span className="skeleton"></span>
                </div>
              </div>

              <div className="containers-especit-all">
                <p className="skeleton skeleton-especif-name"></p>

                <div className="skeleton-especif-main">
                  <p className="skeleton skeleton-especif-input"></p>
                  <p className="skeleton skeleton-especif-btnAdd"></p>
                </div>

                <div className="skeleton-tag-list-spans">
                  <span className="skeleton"></span>
                </div>
              </div>
            </div>


            <div className="container-skeleton-decription">
              <p className="skeleton  skeleton-decription-name"></p>
              <p className="skeleton skeleton-decription-textearea"></p>
            </div>

          </div>

          {/* Área das imagens */}
          <div className="form-images-section">
            <div className="skeleton contanainer-label-addimage"></div>
            <p className="skeleton imgs-skeleton"></p>
          </div>
        </div>

        {/* Botões */}
        <div className="form-actions">
          <button className="skeleton skeleton-buttons-actions"></button>
          <button className="skeleton skeleton-buttons-actions"></button>
        </div>
      </div>

    </section>
  );
}