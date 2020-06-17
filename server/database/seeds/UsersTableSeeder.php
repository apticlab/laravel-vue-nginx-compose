<?php

use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
      $usersAttributes = [
        [
          "name" => "Super",
          "surname" => "Amministratore",
          "email" => "admin@elan.local",
          "password" => "password",
          "role" => "superadmin",
        ],
      ];

      foreach($usersAttributes as $user) {
        $tmpUser = new User();

        $tmpUser->fill([
          "name" => $user["name"],
          "surname" => $user["surname"],
          "email" => $user["email"],
          "password" => Hash::make($user["password"]),
          "role_id" => Role
                ::where("code", $user["role"])
                ->first()
                ->id,
        ]);

        $tmpUser->save();
      }
    }
}
