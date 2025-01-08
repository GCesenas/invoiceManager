<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'view-invoices']);
        Permission::create(['name' => 'upload-invoices']);
        Permission::create(['name' => 'manage-users']);

        $admin = Role::create(['name' => 'admin']);
        $user = Role::create(['name' => 'user']);

        $admin->givePermissionTo(['view-invoices', 'upload-invoices', 'manage-users']);
        $user->givePermissionTo(['view-invoices']);
    }
}
