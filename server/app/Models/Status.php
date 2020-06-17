<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
  protected $table = "status";

  public $visible = [
    "id",
    "name",
    "color",
    "code"
  ];

  protected $fillable = [
    "name",
    "color",
    "code"
  ];
}
