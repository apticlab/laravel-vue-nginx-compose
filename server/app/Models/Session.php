<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
  use SoftDeletes;

  public $visible = [
    "id",
    "proposed_date_1",
    "proposed_date_2",
    "proposed_date_3",
    "report_date",
    "report_note",
    "coaching_plan",
    "date",
    "status",
    "actions",
  ];

  protected $fillable = [
    "id",
    "proposed_date_1",
    "proposed_date_2",
    "proposed_date_3",
    "report_date",
    "report_note",
    "coaching_plan_id",
    "date",
    "status_id"
  ];

  public static function boot() {
    parent::boot();

    self::creating(function($model) {
      $model->status_id = Status::where("code", "idle")->first()->id;
    });
  }

  public function status() {
    return $this->belongsTo(Status::class, "status_id");
  }

  public function actions() {
    return $this->hasMany(Action::class, "session_id");
  }

  public function coaching_plan() {
    return $this->belongsTo(CoachingPlan::class, "coaching_plan_id");
  }
}
