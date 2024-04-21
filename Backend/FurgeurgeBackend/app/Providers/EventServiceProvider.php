<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        'App\Events\OrderCreated' => [
            'App\Listeners\CreateSzallitasEntry',
        ],
    ];

    public function boot()
    {
        parent::boot();
        // Additional code
    }
}
