<?php

namespace App\Providers;

use App\Repositories\Conversation\ConversationRepositoryImpl;
use App\Repositories\Conversation\IConversationRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
