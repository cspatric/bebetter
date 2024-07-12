import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Works({ auth }) {
    const { data, setData, post, processing } = useForm({
        nome: "",
        descricao: "",
        horas: "",
        dataInicio: "",
        dataTermino: "",
        salario: "",
    });

    const [openIndex, setOpenIndex] = useState(null);

    const toggleInformacoes = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [showPopup, setShowPopup] = React.useState(false);
    const [result, setResult] = React.useState(null);
    const [mostrarTempo, setMostrarTempo] = React.useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
        setData({
            nome: "",
            descricao: "",
            horas: "",
            dataInicio: "",
            dataTermino: "",
            salario: "",
        });
        setResult(null); // Limpa o resultado ao fechar o popup
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        // Limita o valor para dois dígitos
        if (value.length > 2) {
            value = value.slice(0, 2);
        }
        setData("horas", value);

        const horasValue = parseInt(value, 10);
        if (!isNaN(horasValue)) {
            const hourMonth = horasValue * 5;
            const hourWeek = hourMonth * 4;
            setResult(
                `Você irá trabalhar ${hourMonth} horas Semanais e ${hourWeek} horas Mensais`
            );
        } else {
            setResult(null);
        }
    };

    const handleDateChange = (e) => {
        const { id, value } = e.target;
        setData(id, value);
    };

    const handleSalarioChange = (e) => {
        let value = e.target.value;
        // Formata para o formato R$00,00
        value = value.replace(/\D/g, ""); // Remove caracteres não numéricos
        value = value.replace(/(\d)(\d{2})$/, "$1,$2"); // Coloca a vírgula antes dos últimos dois dígitos
        value = "R$ " + value.replace(/(?=(\d{3})+(\D))\B/g, "."); // Formata os milhares com ponto

        const numericValue = value.replace(/[^\d,]/g, "").replace(",", ".");

        setData("salario", numericValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se todos os campos obrigatórios estão preenchidos
        const { nome, descricao, horas, salario } = data;

        if (!nome || !descricao || !horas || !salario) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Aqui você pode enviar os dados do formulário para o backend usando Inertia.js
        post(route("contrato.store"), {
            preserveScroll: true, // Opcional: preserva a posição de rolagem após o envio
        });

        togglePopup(); // Fecha o popup após enviar
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Works
                </h2>
            }
        >
            <Head title="Works" />

            <div>
            <div className="bg-white flex-wrap flex min-h-screen items-start mx-auto sm:px-6 lg:px-8 relative">
                    <div className="w-full flex flex-wrap gap-3 h-full mt-3">
                    {auth.contratos.map((contrato, index) => (
                <div className="relative bg-[#925fe2] h-auto  w-2/6 overflow-hidden shadow-sm sm:rounded-3xl  p-2" key={index}>
                    <div className="h-28">
                    <p className="absolute left-10 top-6 text-lg text-white">{contrato.nome}</p>
                    
                    <p className="absolute left-10 top-12 text-3xl text-white">{contrato.horas} Horas</p>

                    <button className="absolute right-2 top-2 bg-[#6a44a7] hover:bg-[#382458] text-white font-bold py-1 px-2 rounded-2xl w-36 h-16">Contar</button>

                    <button 
                        className="absolute right-2 top-20 bg-[#6a44a7] hover:bg-[#382458] text-white font-bold py-1 px-2 rounded-2xl w-36"
                        onClick={() => toggleInformacoes(index)}
                    >
                        ver informacoes
                    </button>
                    </div>
                    {openIndex === index && (
                        <div className="relative h-auto rounded-2xl border-4 p-4 border-[#c7aaf6ca]">
                            
                            <p className="text-xl text-white">{contrato.nome}</p>
                            <p className="text-white">{contrato.descricao}</p>
                            <p className="absolute text-white right-3 top-4 text-lg">R${contrato.salario}</p>       


                            <p><strong>Início:</strong> {contrato.dataInicio}</p>
                            <p><strong>Término:</strong> {contrato.dataTermino}</p>
                            
                        </div>
                    )}
                </div>
            ))}
                        
                        </div>
                    <div className="bg-gray-100 w-64 absolute flex items-start justify-center right-0 h-full overflow-hidden shadow-sm p-3">
                        <button
                            className="bg-[#925fe2] hover:bg-[#382458] text-white font-bold py-2 px-4 rounded-3xl"
                            onClick={togglePopup}
                        >
                            Criar contrato
                        </button>
                    </div>
                </div>
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-7 rounded-xl w-1/3">
                            <h2 className="text-lg font-semibold mb-4">
                                Criar Contrato
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="nome"
                                    >
                                        Nome
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="nome"
                                        type="text"
                                        value={data.nome}
                                        onChange={(e) =>
                                            setData("nome", e.target.value)
                                        }
                                        placeholder="Nome"
                                        name="nome"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="descricao"
                                    >
                                        Descrição
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-14 min-h-14"
                                        id="descricao"
                                        name="descricao"
                                        value={data.descricao}
                                        onChange={(e) =>
                                            setData("descricao", e.target.value)
                                        }
                                        placeholder="Descrição"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="horas"
                                    >
                                        Horas Diárias
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="horas"
                                        type="number"
                                        value={data.horas}
                                        onChange={handleInputChange}
                                        placeholder="Horas Necessárias"
                                        name="horas"
                                    />
                                    {data.horas > 6 && (
                                        <p className="text-red-500 text-sm mt-2">
                                            Cuidado, muito trabalho
                                        </p>
                                    )}
                                    {result && (
                                        <p className="mt-4 text-gray-700">
                                            {result}
                                        </p>
                                    )}
                                </div>

                                <input
                                    type="checkbox"
                                    checked={mostrarTempo}
                                    onChange={(e) =>
                                        setMostrarTempo(e.target.checked)
                                    }
                                />
                                {/* Tempo */}
                                {!mostrarTempo && (
                                    <div>
                                        {/* Seu conteúdo da div "tempo" aqui */}
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="dataInicio"
                                            >
                                                Data de Início
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="dataInicio"
                                                type="date"
                                                value={data.dataInicio}
                                                onChange={handleDateChange}
                                                name="dataInicio"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                className="block text-gray-700 text-sm font-bold mb-2"
                                                htmlFor="dataTermino"
                                            >
                                                Data de Término
                                            </label>
                                            <input
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="dataTermino"
                                                type="date"
                                                value={data.dataTermino}
                                                onChange={handleDateChange}
                                                name="dataTermino"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="salario"
                                    >
                                        Salário
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="salario"
                                        type="text"
                                        value={data.salario}
                                        onChange={handleSalarioChange}
                                        placeholder="R$00,00"
                                        name="salario"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? "Enviando..." : "Criar"}
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                        onClick={togglePopup}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
