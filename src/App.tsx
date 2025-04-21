import Name from "./components/name";
import { TranslationContextProvider } from "./context/translationContext";

function App() {
  return (
    <TranslationContextProvider>
      <main className="bg-tertiary flex w-screen h-screen px-4">
        <div className="flex w-full stroke-2 stroke-primary font-indic">
          <Name fontSize={48} duration={3000} delay={500} className="h-fit" />
        </div>
      </main>
    </TranslationContextProvider>
  );
}

export default App;
