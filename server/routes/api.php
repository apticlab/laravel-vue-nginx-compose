<?php

use Illuminate\Http\Request;

Route::post("login", "UserController@login");
Route::post("login/resetpassword", "UserController@resetPassword");

if (env('APP_DEBUG')) {
  Route::get("/testmail", 'ResourceController@testMail');
}

Route::group(["middleware" =>  'auth:api'], function() {
  Route::post("/resource/act/{resource_name}/{resourceId}/{action_name}", 'ResourceController@act');
  Route::post("resource/{resourceName}", "ResourceController@store");
  Route::post("/useravatar", 'UserController@uploadUserAvatar');
  Route::get("resource/{resourceName}", "ResourceController@index");
  Route::get("resource/{resourceName}/{resourceId}", "ResourceController@show");
  Route::delete("resource/{resourceName}/{resourceId}", "ResourceController@destroy");
});
