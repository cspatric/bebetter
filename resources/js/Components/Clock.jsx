import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css"; // Importa TailwindCSS

const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
        3,
        "0"
    )}`;
};

const Clock = () => {
    const [tempo, setTempo] = useState(0);
    const [contando, setContando] = useState(false);
    const [mostrarCronometro, setMostrarCronometro] = useState(false);
    const [tempoInicial, setTempoInicial] = useState(null);

    useEffect(() => {
        let animationFrame;

        const updateTempo = () => {
            if (contando) {
                const now = performance.now();
                setTempo(now - tempoInicial);
                animationFrame = requestAnimationFrame(updateTempo);
            }
        };

        if (contando) {
            setTempoInicial(performance.now() - tempo);
            animationFrame = requestAnimationFrame(updateTempo);
        } else {
            cancelAnimationFrame(animationFrame);
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [contando, tempoInicial]);

    const iniciarContagem = () => {
        setTempoInicial(performance.now());
        setTempo(0);
        setContando(true);
    };

    const pararContagem = () => {
        setContando(false);
    };

    const mostrarCronometroDiv = () => {
        setMostrarCronometro(true);
        iniciarContagem();
    };

    const fecharPopup = () => {
        setMostrarCronometro(false);
        pararContagem();
    };

    return (
        <div>
            <button
                onClick={mostrarCronometroDiv}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                abrir cronometro
            </button>
            {mostrarCronometro && (
                <div id="contador" className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white w-1/3 h-72 p-6 rounded-lg shadow-lg">
                        <h1 className="text-3xl text-center">Como deseja pontuar?</h1>
                        <div className="w-full">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            adicionar automatico
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            adicionar manual
                        </button>
                        </div>

                        <div id="adicionarManual" className="bg-green-500 h-full flex justify-center flex-col items-center gap-4 text-xl font-semibold mb-4">
                            <h1 className="text-5xl text-center">00:00:00:000</h1>
                            <input type="time" name="" id="" />
                        <div>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            enviar
                        </button>
                        <button
                            onClick={fecharPopup}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Fechar
                        </button>
                        </div>
                        </div>

                        <div id="adicionarAuto" className="bg-green-500 h-full flex justify-center flex-col items-center gap-4 text-xl font-semibold mb-4">
                            <h1 className="text-5xl text-center">{formatTime(tempo)}</h1>
                        
                        <div>
                        <button
                            onClick={pararContagem}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Parar Cronômetro
                        </button>
                        <button
                onClick={mostrarCronometroDiv}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Contar
            </button>
                        <button
                            onClick={fecharPopup}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Fechar
                        </button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clock;
