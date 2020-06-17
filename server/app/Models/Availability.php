<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
  public $visible = [
    "id",
    "date",
    "coach",
    "hour_1_available",
    "hour_2_available",
    "hour_3_available",
    "hour_4_available",
    "hour_1_session",
    "hour_2_session",
    "hour_3_session",
    "hour_4_session",
    "has_available"
  ];

  protected $fillable = [
    "date",
    "coach_id",
    "hour_1_available",
    "hour_2_available",
    "hour_3_available",
    "hour_4_available",
    "hour_1_session_id",
    "hour_2_session_id",
    "hour_3_session_id",
    "hour_4_session_id",
    "has_available"
  ];

  public function coach() {
    return $this->belongsTo(User::class, "coach_id");
  }

  public function hour_1_session() {
    return $this->belongsTo(Session::class, "hour_1_session_id");
  }

  public function hour_2_session() {
    return $this->belongsTo(Session::class, "hour_2_session_id");
  }

  public function hour_3_session() {
    return $this->belongsTo(Session::class, "hour_3_session_id");
  }

  public function hour_4_session() {
    return $this->belongsTo(Session::class, "hour_4_session_id");
  }
}
