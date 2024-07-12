<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContratosTable extends Migration
{
    public function up()
    {
        Schema::create('contratos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->text('descricao');
            $table->integer('horas');
            $table->date('dataInicio')->nullable();
            $table->date('dataTermino')->nullable();
            $table->decimal('salario', 10, 2); // Pode ajustar conforme necessário
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contratos');
    }
}
