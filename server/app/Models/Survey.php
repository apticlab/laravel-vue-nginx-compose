<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
  public $visible = [
    "id",
    "area_1",
    "area_2",
    "area_3",
    "area_4",
    "result",
    "answers",
  ];

  protected $fillable = [
    "area_1",
    "area_2",
    "area_3",
    "area_4",
    "result",
  ];

  public function answers() {
    return $this->hasMany(Answer::class, "survey_id");
  }
}
