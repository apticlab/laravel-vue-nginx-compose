<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
  public $visible = [
    "id",
    "text",
    "order",
    "visible",
    "area",
  ];

  protected $fillable = [
    "text",
    "order",
    "area",
    "visible"
  ];
}
