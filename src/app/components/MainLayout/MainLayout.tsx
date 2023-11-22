import Header from './components/Header';

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="max-w-screen-xl mx-auto pt-4 pb-12">
    <Header />
    <div className="mt-8">{children}</div>
  </div>
);

export default MainLayout;
