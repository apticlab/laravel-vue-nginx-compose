<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
  public $visible = [
    "id",
    "result",
    "note",
    "deadline",
  ];

  protected $fillable = [
    "id",
    "result",
    "note",
    "deadline",
    "session_id"
  ];

}
