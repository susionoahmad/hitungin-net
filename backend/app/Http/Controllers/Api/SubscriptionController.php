<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function active(Request $request): JsonResponse
    {
        $subscription = Subscription::query()
            ->where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->where('end_date', '>=', now())
            ->latest('end_date')
            ->first();

        return response()->json([
            'data' => $subscription ? [
                'id' => $subscription->id,
                'status' => $subscription->status,
                'plan' => $subscription->plan,
                'start_date' => $subscription->start_date?->toISOString(),
                'end_date' => $subscription->end_date?->toISOString(),
                'created_at' => $subscription->created_at?->toISOString(),
            ] : null,
        ]);
    }
}
