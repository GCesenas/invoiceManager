<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class InvoiceController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xml',
        ]);

        $xmlContent = simplexml_load_file($request->file('file')->getPathname());

        $invoice = Invoice::create([
            'uuid' => (string) $xmlContent->UUID,
            'folio' => (string) $xmlContent->UUID,
            'transmitter' => (string) $xmlContent->Emisor->Nombre,
            'receiver' => (string) $xmlContent->Receptor->Nombre,
            'currency' => (string) $xmlContent->Moneda,
            'total' => (float) $xmlContent->Total,
            'exchange_rate' => $this->getExchangeRate(),
        ]);

        return response()->json(['message' => 'Factura cargada exitosamente']);
    }


    private function getExchangeRate()
    {
        $response = Http::get('https://www.banxico.org.mx/tipo-cambio-url');
        return $response->json()['value'];
    }
}
