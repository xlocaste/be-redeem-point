<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'view user']);

        $superAdmin = Role::create(['name' => 'super admin']);
        $superAdmin->givePermissionTo('view user');

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo('view user');
        $user = User::find(1);
        $user->assignRole('admin');

        $user = Role::create(['name' => 'user']);
        $user = User::find(2);
        $user->assignRole('user');
    }
}
