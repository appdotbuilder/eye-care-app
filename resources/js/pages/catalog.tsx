import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';


interface Product {
    id: number;
    name: string;
    description: string;
    type: 'glasses' | 'lenses';
    price: number;
    brand: string;
    images: string[];
    optik_store: {
        id: number;
        store_name: string;
        location: string;
    };
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        total: number;
    };
    brands: string[];
    filters: {
        type?: string;
        brand?: string;
        min_price?: number;
        max_price?: number;
        search?: string;
    };
    [key: string]: unknown;
}

export default function Catalog({ products, brands = [], filters = {} }: Props) {
    return (
        <>
            <Head title="🛍️ Product Catalog - OptiVision" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">🛍️ Product Catalog</h1>
                                <p className="text-gray-600 mt-1">
                                    Discover glasses and lenses from verified optical stores
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Button variant="outline" asChild>
                                    <Link href="/">🏠 Home</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/login">👓 Sign In</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-64 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">🔍 Filters</h3>
                                
                                {/* Product Type */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Type
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value=""
                                                className="mr-2"
                                                defaultChecked={!filters.type}
                                            />
                                            All Products
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="glasses"
                                                className="mr-2"
                                                defaultChecked={filters.type === 'glasses'}
                                            />
                                            👓 Glasses
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="type"
                                                value="lenses"
                                                className="mr-2"
                                                defaultChecked={filters.type === 'lenses'}
                                            />
                                            🔍 Lenses
                                        </label>
                                    </div>
                                </div>

                                {/* Brand Filter */}
                                {brands.length > 0 && (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Brand
                                        </label>
                                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                                            <option value="">All Brands</option>
                                            {brands.map((brand) => (
                                                <option 
                                                    key={brand} 
                                                    value={brand}
                                                    selected={filters.brand === brand}
                                                >
                                                    {brand}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Price Range */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="border border-gray-300 rounded-lg px-3 py-2"
                                            defaultValue={filters.min_price}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="border border-gray-300 rounded-lg px-3 py-2"
                                            defaultValue={filters.max_price}
                                        />
                                    </div>
                                </div>

                                <Button className="w-full">Apply Filters</Button>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Catalog Stats</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Products</span>
                                        <span className="font-semibold">{products.total}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Available Stores</span>
                                        <span className="font-semibold">
                                            {new Set(products.data.map(p => p.optik_store.id)).size}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Brands</span>
                                        <span className="font-semibold">{brands.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="🔍 Search products..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12"
                                        defaultValue={filters.search}
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <span className="text-xl">🔍</span>
                                    </button>
                                </div>
                            </div>

                            {/* Results Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="text-gray-600">
                                    Showing {products.data.length} of {products.total} products
                                </div>
                                <select className="border border-gray-300 rounded-lg px-3 py-2">
                                    <option>Sort by: Newest</option>
                                    <option>Sort by: Price Low to High</option>
                                    <option>Sort by: Price High to Low</option>
                                    <option>Sort by: Name A-Z</option>
                                </select>
                            </div>

                            {/* Products Grid */}
                            {products.data.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                    {products.data.map((product) => (
                                        <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="aspect-w-4 aspect-h-3 bg-gray-200 flex items-center justify-center">
                                                <span className="text-6xl">
                                                    {product.type === 'glasses' ? '👓' : '🔍'}
                                                </span>
                                            </div>
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                                                        {product.name}
                                                    </h3>
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                                                        {product.type}
                                                    </span>
                                                </div>
                                                {product.brand && (
                                                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                                                )}
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="text-2xl font-bold text-green-600">
                                                        ${product.price.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500 mb-4">
                                                    🏪 {product.optik_store.store_name}
                                                    <br />
                                                    📍 {product.optik_store.location}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button size="sm" className="flex-1">
                                                        👁️ View Details
                                                    </Button>
                                                    <Button size="sm" variant="outline">
                                                        🛒 Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Try adjusting your filters or search terms
                                    </p>
                                    <Button variant="outline">
                                        Clear Filters
                                    </Button>
                                </div>
                            )}

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2">
                                    <Button variant="outline" size="sm">
                                        ← Previous
                                    </Button>
                                    <span className="px-4 py-2 text-sm text-gray-600">
                                        Page {products.current_page} of {products.last_page}
                                    </span>
                                    <Button variant="outline" size="sm">
                                        Next →
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}