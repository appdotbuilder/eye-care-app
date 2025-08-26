<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('ro_id')->constrained('users')->onDelete('cascade');
            $table->decimal('sph_right', 5, 2)->nullable();
            $table->decimal('sph_left', 5, 2)->nullable();
            $table->decimal('cyl_right', 5, 2)->nullable();
            $table->decimal('cyl_left', 5, 2)->nullable();
            $table->integer('axis_right')->nullable();
            $table->integer('axis_left')->nullable();
            $table->decimal('add_power', 3, 2)->nullable();
            $table->decimal('pd', 4, 1)->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('examination_date');
            $table->timestamps();
            
            $table->index('customer_id');
            $table->index('ro_id');
            $table->index('examination_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};