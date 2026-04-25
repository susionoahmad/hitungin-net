<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UsageLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsageController extends Controller
{
    private const FREE_DAILY_LIMIT = 3;

    public function summary(Request $request): JsonResponse
    {
        $used = UsageLog::query()
            ->where('user_id', $request->user()->id)
            ->whereDate('created_at', now()->toDateString())
            ->count();

        return response()->json([
            'used' => $used,
            'remaining' => max(0, self::FREE_DAILY_LIMIT - $used),
            'limit' => self::FREE_DAILY_LIMIT,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $request->validate([
            'action' => ['required', 'string', 'max:100'],
        ]);

        $usageLog = UsageLog::query()->create([
            'user_id' => $request->user()->id,
            'action' => $payload['action'],
        ]);

        return response()->json([
            'data' => [
                'id' => $usageLog->id,
                'action' => $usageLog->action,
                'created_at' => $usageLog->created_at?->toISOString(),
            ],
        ], 201);
    }
}
