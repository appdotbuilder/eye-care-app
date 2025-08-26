<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Prescription
 *
 * @property int $id
 * @property int $customer_id
 * @property int $ro_id
 * @property float|null $sph_right
 * @property float|null $sph_left
 * @property float|null $cyl_right
 * @property float|null $cyl_left
 * @property int|null $axis_right
 * @property int|null $axis_left
 * @property float|null $add_power
 * @property float|null $pd
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon $examination_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $customer
 * @property-read \App\Models\User $ro
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription query()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereRoId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereSphRight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereSphLeft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCylRight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCylLeft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereAxisRight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereAxisLeft($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereAddPower($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription wherePd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereExaminationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class Prescription extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'customer_id',
        'ro_id',
        'sph_right',
        'sph_left',
        'cyl_right',
        'cyl_left',
        'axis_right',
        'axis_left',
        'add_power',
        'pd',
        'notes',
        'examination_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sph_right' => 'decimal:2',
        'sph_left' => 'decimal:2',
        'cyl_right' => 'decimal:2',
        'cyl_left' => 'decimal:2',
        'axis_right' => 'integer',
        'axis_left' => 'integer',
        'add_power' => 'decimal:2',
        'pd' => 'decimal:1',
        'examination_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the prescription.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    /**
     * Get the RO that created the prescription.
     */
    public function ro(): BelongsTo
    {
        return $this->belongsTo(User::class, 'ro_id');
    }

    /**
     * Get the orders using this prescription.
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}