<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
  public $visible = [
    "id",
    "question",
    "value",
  ];

  protected $fillable = [
    "question_id",
    "value",
    "survey_id"
  ];

  public function question() {
    return $this->belongsTo(Question::class, "question_id");
  }

}
