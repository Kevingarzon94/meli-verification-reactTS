import { VerificationProvider } from './_contexts/VerificationContext';
import VerificationPage from './_pages/VerificationPage';
import './config/i18n';
import logo from './source/mercadolibre.svg'
function App() {
    return (
        <div className="min-h-screen bg-meli-gray">
            <header className="bg-meli-yellow py-3 px-4">
                <div className="max-w-6xl mx-auto">
                    <img
                        src={logo}
                        alt="Mercado Libre"
                        className="h-8"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.style.height = '32px';
                            target.style.width = '120px';
                            target.style.backgroundColor = '#FFE600';
                            target.alt = 'Mercado Libre';
                        }}
                    />
                </div>
            </header>

            <main className="py-6">
                <VerificationProvider>
                    <VerificationPage />
                </VerificationProvider>
            </main>

            <footer className="bg-white py-4 border-t border-gray-200">
                <div className="max-w-6xl mx-auto px-4 text-center text-sm text-meli-dark-gray">
                    © {new Date().getFullYear()} Mercado Libre
                </div>
            </footer>
        </div>
    );
}

export default App;