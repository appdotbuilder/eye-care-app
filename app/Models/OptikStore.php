<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\OptikStore
 *
 * @property int $id
 * @property int $user_id
 * @property string $store_name
 * @property string|null $description
 * @property string $location
 * @property string|null $license_number
 * @property array|null $operating_hours
 * @property string|null $logo_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore query()
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereStoreName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereLicenseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereOperatingHours($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereLogoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OptikStore whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class OptikStore extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'store_name',
        'description',
        'location',
        'license_number',
        'operating_hours',
        'logo_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'operating_hours' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the optik store.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the products for the store.
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get the orders for the store.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}