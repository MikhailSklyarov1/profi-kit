import pageAppStyle from "./PageApp.module.css";



function PageApp() {
  return (
    <div className={pageAppStyle.container}>
  <div className={pageAppStyle.content}>
    Здесь может располагаться нужный компонент
  </div>
</div>
  );
}

export default PageApp;
