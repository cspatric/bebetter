<?php

namespace App\Http\Controllers;

use App\Models\Contrato;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ContratoController extends Controller
{
    public function index()
{
    $user = Auth::user();
    $contratos = Contrato::all();  // Aqui estamos buscando todos os contratos
    
    return Inertia::render('Works', [
        'auth' => [
            'user' => $user,
            'contratos' => $contratos,  // Passando todos os contratos para a view
        ],
    ]);
}


    public function store(Request $request)
    {
        $contrato = new Contrato([

            'nome' => $request->input('nome'),
            'descricao' => $request->input('descricao'),
            'horas' => $request->input('horas'),
            'salario' => $request->input('salario'),
            'dataInicio' => $request->input('dataInicio'),
            'dataTermino' => $request->input('dataTermino'),
            // Adicione outras validações conforme necessário
        ]);

        $contrato->save();

        return redirect()->route('works')->with('success', 'Contrato criado com sucesso!');
    }
}
