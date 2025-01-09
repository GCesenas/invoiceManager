<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:permissions',
        ]);

        $permission = Permission::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        return response()->json(['message' => 'Permission created successfully', 'permission' => $permission], 201);
    }
}
