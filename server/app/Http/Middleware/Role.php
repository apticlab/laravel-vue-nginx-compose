<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use Closure;

class RoleMiddleware
{
  /*
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    $authorizedRoles = array_slice(func_get_args(), 2);

    $user = $request->user();

    $activeRole = $user
      ->roles()
      ->first()
      ->code;

    if ($request->header("activerole")) {
      // Verify that this user has this role
      $logginUserRoles = $user->roles()->pluck("code")->toArray();

      if (!in_array($request->header("activerole"), $logginUserRoles)) {
        // If role hasn't been found, return 401
        return response("unauthorized", 401);
      } else {
        $activeRole = $request->header("activeRole");
      }
    }

    if (in_array($activeRole, $authorizedRoles)) {
      Auth::user()->setActiveRole($activeRole);
      return $next($request);
    }

    // If role hasn't been found, return 401
    return response("unauthorized", 401);
  }
}
