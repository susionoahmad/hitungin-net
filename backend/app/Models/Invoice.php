<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'client_name',
        'invoice_number',
        'tax_rate',
        'business_name',
        'business_email',
        'business_phone',
        'business_address',
        'due_date',
        'payment_terms',
        'accent_color',
        'items',
        'subtotal',
        'total',
        'logo_data_url',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'date:Y-m-d',
            'items' => 'array',
            'subtotal' => 'decimal:2',
            'tax_rate' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
