<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'uuid',
        'folio',
        'transmitter',
        'receiver',
        'currency',
        'total',
        'exchange_rate',
    ];
}
