<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return $request->user()->load('roles', 'permissions');
    }

    public function index()
    {
        $users = User::with('roles', 'permissions')->get();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'permissions' => 'nullable|array', 
            'permissions.*' => 'exists:permissions,name', 
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        if (!empty($validated['permissions'])) {
            $user->givePermissionTo($validated['permissions']);
        }

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'user' => $user->load('permissions'),
        ], 201);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }

    public function assignPermissions(Request $request, $id)
    {
        $validated = $request->validate([
            'permissions' => 'array', 
            'permissions.*' => 'exists:permissions,name',
        ]);
    
        $user = User::findOrFail($id);
    
        $user->syncPermissions($validated['permissions'] ?? []);
    
        return response()->json([
            'message' => 'Permisos asignados correctamente',
            'user' => $user->load('permissions'),
        ], 200);
    }
    
}
