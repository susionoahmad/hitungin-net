<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        // Simple check for admin role
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $users = User::query()
            ->withCount(['usageLogs', 'invoices'])
            ->latest()
            ->paginate(50);

        return response()->json($users);
    }

    public function updatePlan(Request $request, User $user): JsonResponse
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'plan' => 'required|in:free,pro',
            'role' => 'sometimes|in:user,admin',
            'plan_expires_at' => 'nullable|date',
        ]);

        // Auto-set expiry if upgrading to PRO and not provided
        if ($validated['plan'] === 'pro' && !isset($validated['plan_expires_at'])) {
            $user->plan_expires_at = now()->addMonth();
        } elseif ($validated['plan'] === 'free') {
            $user->plan_expires_at = null;
        }

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user
        ]);
    }
}
