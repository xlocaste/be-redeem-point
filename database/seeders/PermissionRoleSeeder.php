<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
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
        Permission::create(['name' => 'view product']);

        $superAdmin = Role::create(['name' => 'super admin']);
        $superAdmin->givePermissionTo('view user');
        $superAdmin->givePermissionTo('view product');

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo('view user');
        $admin->givePermissionTo('view product');

        $user = Role::create(['name' => 'user']);
        $user->givePermissionTo('view product');

        User::create([
                'name' => 'admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'role' => 'admin',
            ]);

        User::create([
                'name' => 'user',
                'email' => 'user@example.com',
                'password' => bcrypt('password'),
                'role' => 'user',
            ]);
    }
}
