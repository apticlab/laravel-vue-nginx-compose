<?php

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
      $rolesAttributes = [
        [
          "code" => "admin",
          "color" => "#e74c3c",
          "name" => "SuperAmministratore",
        ],
      ];

      foreach($rolesAttributes as $role) {
        $tmpRole = new Role();

        $tmpRole->fill($role);
        $tmpRole->save();
      }
    }
}
