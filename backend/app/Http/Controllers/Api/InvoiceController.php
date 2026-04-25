<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $invoices = Invoice::query()
            ->where('user_id', $request->user()->id)
            ->latest()
            ->limit(12)
            ->get()
            ->map(fn (Invoice $invoice) => $this->transformInvoice($invoice));

        return response()->json([
            'data' => $invoices,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $payload = $this->validateInvoice($request);

        $invoice = Invoice::query()->create([
            ...$payload,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'data' => $this->transformInvoice($invoice),
        ], 201);
    }

    public function update(Request $request, Invoice $invoice): JsonResponse
    {
        abort_if($invoice->user_id !== $request->user()->id, 403);

        $invoice->update($this->validateInvoice($request));

        return response()->json([
            'data' => $this->transformInvoice($invoice->fresh()),
        ]);
    }

    private function validateInvoice(Request $request): array
    {
        return $request->validate([
            'client_name' => ['nullable', 'string', 'max:255'],
            'invoice_number' => ['required', 'string', 'max:255'],
            'tax_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'business_name' => ['nullable', 'string', 'max:255'],
            'business_email' => ['nullable', 'email', 'max:255'],
            'business_phone' => ['nullable', 'string', 'max:50'],
            'business_address' => ['nullable', 'string'],
            'due_date' => ['nullable', 'date'],
            'payment_terms' => ['nullable', 'string', 'max:255'],
            'accent_color' => ['required', 'string', 'max:20'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.qty' => ['required', 'numeric', 'min:0'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
            'subtotal' => ['required', 'numeric', 'min:0'],
            'total' => ['required', 'numeric', 'min:0'],
            'logo_data_url' => ['nullable', 'string'],
        ]);
    }

    private function transformInvoice(Invoice $invoice): array
    {
        return [
            'id' => $invoice->id,
            'user_id' => $invoice->user_id,
            'client_name' => $invoice->client_name,
            'invoice_number' => $invoice->invoice_number,
            'tax_rate' => (float) $invoice->tax_rate,
            'business_name' => $invoice->business_name,
            'business_email' => $invoice->business_email,
            'business_phone' => $invoice->business_phone,
            'business_address' => $invoice->business_address,
            'due_date' => $invoice->due_date?->format('Y-m-d'),
            'payment_terms' => $invoice->payment_terms,
            'accent_color' => $invoice->accent_color,
            'items' => $invoice->items ?? [],
            'subtotal' => (float) $invoice->subtotal,
            'total' => (float) $invoice->total,
            'logo_data_url' => $invoice->logo_data_url,
            'created_at' => $invoice->created_at?->toISOString(),
            'updated_at' => $invoice->updated_at?->toISOString(),
        ];
    }
}
