<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use GuzzleHttp\Client;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::all();
        return response()->json($invoices);
    }

    public function uploadInvoice(Request $request)
    {
        try {
            $validated = $request->validate([
                'xml' => 'required|file|mimes:xml',
            ]);

            $xmlContent = file_get_contents($request->file('xml'));
            $xml = new \SimpleXMLElement($xmlContent);

            $namespaces = $xml->getNamespaces(true);
            $xml->registerXPathNamespace('cfdi', $namespaces['cfdi']);
            $xml->registerXPathNamespace('tfd', $namespaces['tfd']);

            $uuid = $xml->xpath('//tfd:TimbreFiscalDigital')[0]['UUID'] ?? null;
            $folio = (string) ($xml['Folio'] ?? substr($uuid, strrpos($uuid, '-') + 1));
            $transmitter = $xml->xpath('//cfdi:Emisor')[0]['Nombre'] ?? null;
            $receiver = $xml->xpath('//cfdi:Receptor')[0]['Nombre'] ?? null;
            $currency = (string) $xml['Moneda'];
            $total = (float) $xml['Total'];

            $responseTodayExchangeRate = $this->getTodayExchangeRate();
            $data = json_decode($responseTodayExchangeRate->getContent(), true);

            $exchangeRate = isset($data['exchange_rate']) && !empty($data['exchange_rate']) ? $data['exchange_rate'] : 20;

            $invoice = Invoice::create([
                'uuid' => $uuid,
                'folio' => $folio,
                'transmitter' => $transmitter,
                'receiver' => $receiver,
                'currency' => $currency,
                'total' => $total,
                'exchange_rate' => $exchangeRate,
            ]);

            return response()->json(['message' => 'Factura procesada correctamente.', 'invoice' => $invoice], 201);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'message' => 'La factura ya fue subida.',
                ], 409);
            }
            
            return response()->json([
                'message' => 'Ocurrió un error al subir la factura.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function getTodayExchangeRate()
    {
        $client = new Client();

        $formattedDate = now()->format('d-m-Y');
        $url = "https://sidofqa.segob.gob.mx/dof/sidof/indicadores/158/{$formattedDate}/{$formattedDate}";

        try {
            $response = $client->request('GET', $url, [
                'headers' => [
                    'User-Agent' => 'Guzzle Client',
                ],
            ]);

            $data = json_decode($response->getBody(), true);

            if (!empty($data['ListaIndicadores']) && isset($data['ListaIndicadores'][0]['valor'])) {
                $exchangeRate = $data['ListaIndicadores'][0]['valor'];
                return response()->json(['exchange_rate' => $exchangeRate], 200);
            }

            return response()->json(['error' => 'No se encontró el tipo de cambio.'], 404);
        } catch (\Exception $e) {
            \Log::error('Error al conectar con la API', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'Error al obtener el tipo de cambio.', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Factura eliminada correctamente']);
    }
}
