import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-xl text-green-500 mb-4">PARA MAKINASI {count}</h1>
        <button
          className="bg-slate-300 hover:bg-slate-400 transition-all rounded-lg px-4 py-2"
          onClick={() => setCount((prev) => prev + 1)}
        >
          TIKLA VE KAZAN
        </button>
      </div>
    </>
  );
}

export default App;
