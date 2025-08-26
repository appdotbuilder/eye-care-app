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
        Schema::create('face_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->onDelete('cascade');
            $table->string('face_shape');
            $table->json('analysis_data')->nullable();
            $table->json('recommended_frames')->nullable();
            $table->string('image_path')->nullable();
            $table->decimal('confidence_score', 3, 2)->nullable();
            $table->timestamps();
            
            $table->index('customer_id');
            $table->index('face_shape');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('face_analyses');
    }
};