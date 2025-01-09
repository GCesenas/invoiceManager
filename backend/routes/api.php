<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

Route::middleware(['auth:sanctum'])->get('/user', [UserController::class, 'user']);

Route::middleware(['auth:sanctum', 'permission:manage-users'])->prefix('admin')->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::post('users/{id}/permissions', [UserController::class, 'assignPermissions']);

    Route::get('roles', [RoleController::class, 'index']);
    Route::get('permissions', [PermissionController::class, 'index']);
    Route::post('permissions', [PermissionController::class, 'store']);
});

Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::middleware(['permission:view-invoices'])->get('/invoices', [InvoiceController::class, 'index']);

    Route::middleware(['permission:upload-invoices'])->group(function () {
        Route::post('/invoices', [InvoiceController::class, 'uploadInvoice']);
        Route::delete('invoices/{id}', [InvoiceController::class, 'destroy']);
    });
});
