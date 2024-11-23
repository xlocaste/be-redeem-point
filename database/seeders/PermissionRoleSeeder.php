<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $superAdmin = Role::create(['name' => 'super admin']);

        $admin = Role::create(['name' => 'admin']);
        $user = User::find(1);
        $user->assignRole('admin');

        $user = Role::create(['name' => 'user']);
        $user = User::find(2);
        $user->assignRole('user');
    }
}
