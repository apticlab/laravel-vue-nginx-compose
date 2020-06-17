<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoachingPlan extends Model
{
  use SoftDeletes;

  protected $table = "coaching_plans";

  public $visible = [
    "id",
    "status",
    "coach",
    "user",
    "coaching_agreement",
    "survey",
    "sessions",
    "goal_1",
    "goal_2",
    "goal_3",
    "approved",
    "change_requested",
    "approval_required",
    "approval_date",
    "sessions_number",
    "kpi_measure",
    "created_at",
    "progress"
  ];

  protected $fillable = [
    "id",
    "status_id",
    "coach_id",
    "user_id",
    "survey_id",
    "coaching_agreement_id",
    "change_requested",
    "goal_1",
    "goal_2",
    "goal_3",
    "approved",
    "approval_date",
    "approval_required",
    "sessions_number",
    "kpi_measure",
    "survey"
  ];

  protected $appends = [
    "progress"
  ];

  public function sessions() {
    return $this->hasMany(Session::class);
  }

  public function coach() {
    return $this->belongsTo(User::class, "coach_id");
  }

  public function survey() {
    return $this->belongsTo(Survey::class, "survey_id");
  }

  public function status() {
    return $this->belongsTo(Status::class, "status_id");
  }

  public function user() {
    return $this->belongsTo(User::class, "user_id");
  }

  public function getProgressAttribute() {
    return $this
      ->sessions()
      ->whereHas("status", function($query) {
        $query->where("code", "=", "done");
      })
      ->count();
  }
}
