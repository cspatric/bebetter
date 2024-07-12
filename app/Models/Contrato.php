<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'descricao', 'horas', 'dataInicio', 'dataTermino', 'salario',
    ];

    // Adicione outros métodos ou relacionamentos conforme necessário
}
