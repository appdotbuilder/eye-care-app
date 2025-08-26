<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of products (catalog).
     */
    public function index(Request $request)
    {
        $query = Product::with(['optikStore', 'orderItems'])
            ->where('status', 'active');

        // Apply filters
        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->brand) {
            $query->where('brand', $request->brand);
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('brand', 'like', '%' . $request->search . '%');
            });
        }

        $products = $query->paginate(12);
        $brands = Product::where('status', 'active')->distinct()->pluck('brand')->filter()->sort()->values();

        return Inertia::render('catalog', [
            'products' => $products,
            'brands' => $brands,
            'filters' => $request->only(['type', 'brand', 'min_price', 'max_price', 'search']),
        ]);
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'product' => $product->load(['optikStore.user', 'orderItems']),
        ]);
    }
}